import type { Prisma } from '@prisma/client';
import { prisma } from '~/utils/prisma.server';

export type Constructor = Prisma.ConstructorGetPayload<{}>;

export class ConstructorCollection {
  static update = async (where: Prisma.ConstructorWhereUniqueInput, data: Prisma.ConstructorUpdateInput) => {
    return prisma.constructor.update({
      where,
      data,
    });
  };

  static upsert = async (where: Prisma.ConstructorWhereUniqueInput, data: Prisma.ConstructorCreateInput) => {
    return prisma.constructor.upsert({
      where,
      update: data,
      create: data,
    });
  };

  static get = async (where: Prisma.ConstructorWhereUniqueInput) => {
    return prisma.constructor.findFirst({
      where,
    });
  };

  static getAll = async () => {
    const result = await prisma.constructor.findMany();
    return result;
  };

  static delete = async (where: Prisma.ConstructorWhereUniqueInput) => {
    return prisma.constructor.delete({ where });
  };
}
