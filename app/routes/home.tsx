import { requireUserId } from "~/utils/auth.server";
import type { Route } from "./+types/home";
import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = ({ request }) => {
  return requireUserId(request);
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Formula 1 - Predictor" },
    { name: "description", content: "Predict formula one results" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      Login
    </main>
  );
}
