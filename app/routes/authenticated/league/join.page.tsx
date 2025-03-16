import { useState } from 'react';
import { Link, redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { LeagueCollection } from '~/collections/league.collection.server';
import { UserCollection } from '~/collections/user.collection.server';
import { FormField } from '~/components/form-field';
import { requireUserId } from '~/loader-functions/user.server';
import { errorResponse } from '~/utils/responses';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const joinCode = new URL(request.url).searchParams.get('code')?.toUpperCase();
  if (!joinCode) return;

  const userId = await requireUserId(request);

  const league = await LeagueCollection.findLeague({ joinCode });
  if (!league) return errorResponse('League not found', { status: 404 });

  if (league.members.includes(userId)) {
    return redirect(`/league/${league.id}`);
  }

  await LeagueCollection.addMember({ id: league.id }, userId);
  await UserCollection.addLeague(userId, league.id);

  return redirect(`/league/${league.id}`);
};

export default function JoinLeaguePage() {
  const [joinCode, setJoinCode] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(event.target.value);
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>

      <h2 className="text-2xl">Join a League!</h2>

      <form className="mt-2 rounded-2xl bg-black-200 p-6 w-96 bg-gray-900 border-red-500 border-2">
        <FormField
          htmlFor="leagueJoinCode"
          label="League Join Code"
          value={joinCode}
          autocomplete="off"
          onChange={handleInputChange}
        />

        <div className="w-full text-center mt-2">
          <Link to={`/league/join?code=${joinCode}`} className="rounded-xl font-semibold text-red-400 px-3 py-2">
            Join league
          </Link>
        </div>
      </form>
    </main>
  );
}
