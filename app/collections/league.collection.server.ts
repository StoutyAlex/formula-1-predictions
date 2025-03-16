import type { Prisma } from '@prisma/client';
import { prisma } from '~/utils/prisma.server';
import { UserCollection, type User } from './user.collection.server';

export type League = Prisma.LeagueGetPayload<{}>;

export class LeagueCollection {
  static exists = async (leagueName: string, ownerId: string) => {
    const exists = await prisma.league.count({
      where: {
        name: leagueName,
        owner: ownerId,
      },
    });

    return Boolean(exists);
  };

  static findLeague = async (where: Prisma.LeagueWhereUniqueInput) => {
    return prisma.league.findFirst({
      where
    });
  }

  static addMember = async (where: Prisma.LeagueWhereUniqueInput, userId: string) => {
    return prisma.league.update({
      where,
      data: {
        members: {
          push: userId,
        }
      }
    });
  };

  static update = async (where: Prisma.LeagueWhereUniqueInput, data: Prisma.LeagueUpdateInput) => {
    return prisma.league.update({
      where,
      data,
    });
  };

  static getMembers = async (leagueOrId: League | string) => {
    const league = typeof leagueOrId === 'string' ? await prisma.league.findUnique({
      where: { id: leagueOrId },
      select: {
        members: true,
      },
    }) : leagueOrId;
    
    if (!league) return null;

    const members = await UserCollection.getUsers({ id: { in: league.members } });
    return members;
  };

  static createLeague = async (data: Prisma.LeagueCreateInput) => {
    return prisma.league.create({
      data,
    });
  };

  static getLeaguesForUser = async (user: User) => {
    return prisma.league.findMany({
      where: {
        id: { in: user.profile.leagues },
      },
    });
  };

  static delete = async (where: Prisma.LeagueWhereUniqueInput) => {
    return prisma.league.delete({ where });
  }

  static getLeague = async (where: Prisma.LeagueWhereUniqueInput) => {
    return prisma.league.findUnique({
      where,
    });
  };
}
