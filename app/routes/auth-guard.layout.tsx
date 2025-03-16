import { Outlet, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Layout } from '~/components/layout';
import { requireAndGetUser } from '~/loader-functions/user.server';

export const loader = ({ request }: LoaderFunctionArgs) => {
  return requireAndGetUser(request);
};
