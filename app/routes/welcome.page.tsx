import { Layout } from '~/root';
import type { Route } from '../+types/root';
import { redirect, type LoaderFunctionArgs } from 'react-router';
import { getUserId } from '~/utils/auth.server';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Formula 1 Predictor' }, { name: 'description', content: 'Welcome to Formula One Predictor' }];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getUserId(request);
  if (session) return redirect('/home');
};

export default function WelcomePage() {
  return (
    <Layout>
      <main className="flex items-center justify-center pt-16 pb-4">Welcome to Formula 1 Predictor</main>
    </Layout>
  );
}
