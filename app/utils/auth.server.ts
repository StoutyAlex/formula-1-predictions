import { createCookieSessionStorage, redirect } from "react-router";
import { prisma } from "./prisma.server";
import type { LoginForm, RegisterForm } from "./types.server";
import { createUser } from "./users.server";
import bcrypt from "bcryptjs";
import { errorResponse } from "./responses";
import { use } from "react";

const secret = process.env.SESSION_SECRET;
if (!secret) {
    throw new Error('SESSION_SECRET is not set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'f1p-session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [secret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    }
})

export const register = async (form: RegisterForm) => {
  const exists = await prisma.user.count({ where: { email: form.email } });
  if (exists) {
    return errorResponse("User already exists with that email.", { status: 400 });
  }

  const newUser = await createUser(form);
  if (!newUser) {
    return errorResponse("Something went wrong trying to create account.", {
      status: 400,
      additionalData: {
        fields: form,
      },
    });
  }

  return createUserSession(newUser.id, '/');
};

export const login = async (form: LoginForm) => {
  const incorrectLoginResponse = errorResponse("Incorrect Login", { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: form.email } });
  if (!user) return incorrectLoginResponse;

  const passwordMatch = await bcrypt.compare(form.password, user.password);
  if (!passwordMatch) return incorrectLoginResponse;

  return createUserSession(user.id, '/');
};

export const createUserSession = async (userId: string, redirectUrl: string) => {
    const session = await storage.getSession();
    session.set("userId", userId);

    return redirect(redirectUrl, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    });
}

export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"))
}

export const requireUserId = async (request: Request, redirectTo?: string) => {
  const redirectToUrl = redirectTo || new URL(request.url).pathname

  const session = await getUserSession(request)
  const userId = session.get("userId")

  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectToUrl]])
    throw redirect(`/login?${searchParams}`)
  }

  return userId;
}

export const getUserId = async (request: Request) => {
  const session = await getUserSession(request)
  const userId = session.get("userId")

  if (!userId || typeof userId !== "string") {
    return null;
  }

  return userId;
}

export const getUser = async (request: Request) => {
  const userId = await getUserId(request)
  if (!userId) return null;

  try {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true }
    })
  } catch (error) {
    throw logout(request)
  }
}

export const logout = async (request: Request) => {
  const session = await getUserSession(request)
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  })
}