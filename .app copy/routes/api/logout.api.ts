import { type ActionFunction } from 'react-router';

export const action: ActionFunction = async ({ request }) => {
  console.log('Logged out', request);
};
