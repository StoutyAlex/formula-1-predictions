import type { Prisma } from '@prisma/client';
import { prisma } from '~/utils/prisma.server';

export type Driver = Prisma.LeagueGetPayload<{}>;

export class DriverCollection {
  static update = async (where: Prisma.DriverWhereUniqueInput, data: Prisma.DriverUpdateInput) => {
    return prisma.driver.update({
      where,
      data,
    });
  };

  static get = async (where: Prisma.DriverWhereUniqueInput) => {
    return prisma.driver.findFirst({
      where,
    });
  };

  static delete = async (where: Prisma.DriverWhereUniqueInput) => {
    return prisma.driver.delete({ where });
  };
}
