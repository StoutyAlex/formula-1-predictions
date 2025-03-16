import { redirect, type ActionFunction, type LoaderFunction } from 'react-router';
import { logout } from '~/utils/auth.server';

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  return redirect('/');
};
