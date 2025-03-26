import { Outlet, redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Layout } from '~/components/layout';
import { UserContext } from '~/contexts/user.context';
import { requireAndGetUser } from '~/loader-functions/user.server';
import { AdminHeader } from './components/admin-header.component';
import { AdminList } from './components/admin-list.component';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireAndGetUser(request);
  if (user.username === 'StoutyAlex') {
    return user;
  }

  return redirect('/', {
    status: 302,
  });
};

export default function AdminGuardLayout() {
  const user = useLoaderData<typeof loader>();

  return (
    <>
      <AdminHeader />
      <div className="pt-18 flex flex-row h-full">
        <AdminList />
        <Outlet />
      </div>
    </>
  );
}
