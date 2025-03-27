import { Outlet, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { UserContext } from '~/contexts/user.context';
import { requireAndGetUser } from '~/loader-functions/user.server';

export const loader = ({ request }: LoaderFunctionArgs) => {
  return requireAndGetUser(request);
};

export default function AuthGuardLayout() {
  const user = useLoaderData<typeof loader>();

  return (
    <UserContext value={{ user }}>
      <Outlet />
    </UserContext>
  );
}
