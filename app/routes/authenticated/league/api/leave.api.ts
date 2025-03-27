import { redirect, type LoaderFunctionArgs } from 'react-router';
import { LeagueCollection } from '~/database/collections/league.collection.server';
import { UserCollection } from '~/database/collections/user.collection.server';
import { requireAndGetUser } from '~/loader-functions/user.server';
import { errorResponse } from '~/utils/responses';

// TODO: Change to action api endpoint and useFetcher
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const leagueId = params.leagueId;
  if (!leagueId) return errorResponse('Incorrect Parameters', { status: 400 });

  const user = await requireAndGetUser(request);

  const league = await LeagueCollection.getLeague({ id: leagueId });
  if (!league) return errorResponse('League not found', { status: 404 });

  if (!league.members.includes(user.id)) {
    return redirect('/home');
  }

  const memberIndex = league.members.indexOf(user.id);
  if (memberIndex === -1) {
    return redirect('/home');
  }

  league.members.splice(memberIndex, 1);

  const updatedLeague = await LeagueCollection.update({ id: leagueId }, { members: league.members });
  if (updatedLeague.members.length === 0) {
    await LeagueCollection.delete({ id: league.id });
  }

  const leagueIndex = user.profile.leagues.indexOf(league.id);
  if (leagueIndex === -1) {
    return redirect('/home');
  }

  user.profile.leagues.splice(leagueIndex, 1);

  await UserCollection.update({ id: user.id }, { profile: { leagues: user.profile.leagues } });
  return redirect('/home');
};
