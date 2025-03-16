import { LeagueCollection } from '~/collections/league.collection.server';
import { errorResponse } from '~/utils/responses';

import ShortUniqueId from 'short-unique-id';
import { UserCollection } from '~/collections/user.collection.server';

const { randomUUID: createJoinCode } = new ShortUniqueId({ length: 8 });

export const createLeague = async (leagueName: string, ownerId: string) => {
  const joinCode = createJoinCode().toUpperCase();

  const exists = await LeagueCollection.exists(leagueName, ownerId);
  if (exists) {
    throw errorResponse('You already have league with that name.', {
      status: 400,
      additionalData: {
        fields: { leagueIdentifier: leagueName },
      },
    });
  }

  const league = await LeagueCollection.createLeague({
    name: leagueName,
    owner: ownerId,
    joinCode,
    members: [ownerId],
  });

  if (!league) {
    throw errorResponse('Something went wrong trying to create league.', {
      status: 400,
      additionalData: {
        fields: { leagueIdentifier: leagueName },
      },
    });
  }

  await UserCollection.addLeague(ownerId, league.id);
  return league;
};
