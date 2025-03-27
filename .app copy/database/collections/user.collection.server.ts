import type { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect } from 'react-router';
import { prisma } from '~/utils/prisma.server';
import type { RegisterForm } from '~/utils/types.server';

export type User = Prisma.UserGetPayload<{
  omit: {
    password: true;
    createdAt: true;
    updatedAt: true;
    email: true;
  };
}>;

export type FullUser = Prisma.UserGetPayload<{}>;

export class UserCollection {
  static createUser = async (user: RegisterForm): Promise<User> => {
    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: passwordHash,
        username: user.username,
        profile: {
          leagues: [],
        }
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        email: true,
      },
    });

    return newUser;
  };

  static exists = async (where: Prisma.UserWhereUniqueInput): Promise<boolean> => {
    const count = await prisma.user.count({ where });
    return Boolean(count);
  };

  static getUsers = async (where: Prisma.UserWhereInput): Promise<User[]> => {
    return prisma.user.findMany({
      where,
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        email: true,
      },
    });
  };

  static update = async (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) => {
    await prisma.user.update({
      where,
      data,
    });
  }

  static addLeague = async (userId: string, leagueId: string): Promise<User> => {
    return prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          update: {
            leagues: {
              push: leagueId,
            },
          },
        },
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        email: true,
      },
    });
  };

  static getUser = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return prisma.user.findUnique({
      where,
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        email: true,
      },
    });
  };

  static getFullUser = async (where: Prisma.UserWhereUniqueInput): Promise<FullUser | null> => {
    return prisma.user.findUnique({
      where,
    });
  };
}
