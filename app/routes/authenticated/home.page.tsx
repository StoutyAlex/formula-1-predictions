import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Layout } from '~/components/layout';
import { requireAndGetUser } from '~/loader-functions/user.server';

export const loader = ({ request }: LoaderFunctionArgs) => {
  return requireAndGetUser(request);
};

export default function HomePage() {
  const user = useLoaderData<typeof loader>();

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <div>Welcome {user.username}</div>
      <div>Formula one predictor</div>
    </main>
  );
}
