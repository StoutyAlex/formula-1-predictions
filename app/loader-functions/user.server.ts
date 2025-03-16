import type { Prisma } from '@prisma/client';
import { redirect } from 'react-router';
import { getUserId, getUserSession, logout } from '~/utils/auth.server';
import { prisma } from '~/utils/prisma.server';

export type User = Prisma.UserGetPayload<{
  omit: {
    password: true;
    createdAt: true;
    updatedAt: true;
    email: true;
  };
}>;

export const getUser = async (request: Request): Promise<User | null> => {
  const userId = await getUserId(request);
  if (!userId) return null;

  try {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });
  } catch (error) {
    throw logout(request);
  }
};

export const requireAndGetUser = async (request: Request) => {
  await requireUserId(request);
  const user = await getUser(request);
  if (!user) throw logout(request);
  return user;
};

export const requireUserId = async (request: Request, redirectTo?: string) => {
  const redirectToUrl = redirectTo || new URL(request.url).pathname;

  const session = await getUserSession(request);
  const userId = session.get('userId');

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectToUrl]]);
    throw redirect(`/login?${searchParams}`);
  }

  return userId;
};
