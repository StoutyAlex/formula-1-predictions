import type { Route } from "./+types/home";
import { Layout } from "~/components/layout";
import { FormField } from "~/components/form-field";
import React, { useEffect, useRef, useState } from "react";
import { redirect, useActionData, type ActionFunction, type LoaderFunction } from "react-router";
import { errorResponse } from "~/utils/responses";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "~/utils/validators.server";
import { getUser, login, register } from "~/utils/auth.server";

enum Action {
  Login = "login",
  SignUp = "signup",
}

export const loader: LoaderFunction = async ({ request }) => {
  return await getUser(request) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const action = form.get("_action");

  const email = form.get("email");
  const password = form.get("password");
  const username = form.get("username");

  const invalidFormResponse = errorResponse("Invalid Form Data", {
    additionalData: { form: action },
    status: 400,
  });

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return invalidFormResponse;
  }

  if (action === Action.Login && typeof email !== "string") {
    return invalidFormResponse;
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === Action.SignUp
      ? {
          username: validateUsername((username as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean)) {
    return errorResponse("Invalid Inputs", {
      status: 400,
      additionalData: {
        errors,
        fields: { email, password, username },
        form: action,
      },
    });
  }

  switch (action) {
    case Action.Login:
      return await login({ email, password });
    case Action.SignUp:
      return await register({ email, password, username: username as string });
    default:
      return errorResponse("Invalid Form Data", { status: 400 });
  }
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Formula 1 - Predictor Login" },
    { name: "description", content: "Login to F1P" },
  ];
}

export default function Login() {
  const actionData = useActionData();

  const [formError, setFormError] = useState(actionData?.error || "");
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [action, setAction] = useState<Action>(Action.Login);
  const firstLoad = useRef(true)
  const [formData, setFormData] = useState({
    email: actionData?.fields.email || '',
    password: actionData?.fields.password || '',
    username: actionData?.fields.username || '',
  });

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: '',
        password: '',
        username: '',
      }

      setErrors(newState)
      setFormError('')
      setFormData(newState)
    }
  }, [action])

  useEffect(() => {
    if (!firstLoad.current) setFormError('')
  }, [formData])

  useEffect(() => {
    firstLoad.current = false
  }, [])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.value,
    }));
  };

  return (
    <Layout>
      <div className="h-full flex justify-center items-center flex-col gap-y-4">
        <button
          onClick={() =>
            setAction(action === Action.Login ? Action.SignUp : Action.Login)
          }
          className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2"
        >
          {action === Action.Login ? "Sign Up" : "Sign In"}
        </button>
        <h2 className="text-3xl font-bold">Formula 1 Predictions</h2>
        <p className="font-semibold text-slate-300">
          {action === Action.Login
            ? "Log In To Play"
            : "Sign Up To Get Started!"}
        </p>

        <form
          method="POST"
          className="mt-2 rounded-2xl bg-black-200 p-6 w-96 bg-gray-900 border-red-500 border-2"
        >
          {formError && (
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
              {formError}
            </div>
          )}

          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email}
          />

          {action !== Action.Login ? (
            <FormField
              htmlFor="username"
              label="Username"
              value={formData.username}
              onChange={(e) => handleInputChange(e, "username")}
              error={errors?.username}
            />
          ) : null}

          <FormField
            htmlFor="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors?.password}
          />

          <div className="w-full text-center mt-2">
            <button
              type="submit"
              name="_action"
              value={action}
              className="rounded-xl font-semibold text-red-400 px-3 py-2"
            >
              {action === Action.Login ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
