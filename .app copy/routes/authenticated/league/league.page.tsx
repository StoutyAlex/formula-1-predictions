import { useEffect } from 'react';
import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { useUser } from '~/contexts/user.context';
import { LeagueCollection } from '~/database/collections/league.collection.server';
import { requireAndGetUser } from '~/loader-functions/user.server';
import { errorResponse, jsonResponse } from '~/utils/responses';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const leagueId = params.leagueId;
  if (!leagueId) return jsonResponse({}, { status: 404 });

  const user = await requireAndGetUser(request);
  const league = await LeagueCollection.getLeague({ id: leagueId });

  if (!league) return jsonResponse({}, { status: 404 });
  // TODO: Make a 404 / 403 page
  if (!league.members.includes(user.id)) return errorResponse('You are not a member of this league', { status: 403 });

  const members = await LeagueCollection.getMembers(league);
  if (!members) return errorResponse('Issue loading league', { status: 500 });

  return {
    ...league,
    members,
  };
};

export default function LeaguePage() {
  const league = useLoaderData<typeof loader>();

  const { user } = useUser();

  const members = league.members.map((member) => member.username);
  const owner = league.members.find((member) => member.id === league.owner)?.username;

  useEffect(() => {
    if (!league) return;
    if (!user) return;

    if (!user.profile.leagues.includes(league.id)) {
      user.profile.leagues.push(league.id);
    }
  }, [user, league]);

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>

      <h2 className="text-2xl mb-4">{league.name}</h2>
      <p>Join code: {league.joinCode.toUpperCase()}</p>
      <p>Members: {JSON.stringify(members)}</p>
      <p>Owner: {owner}</p>

      <br />
        <Link to={`/league/leave/${league.id}`}>
          Leave
        </Link>
    </main>
  );
}
