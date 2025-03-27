import type { Prisma } from '@prisma/client';

export class ConstructorEntity {
  public readonly name: string;
  public readonly color: string;
  public readonly country: string;
  public readonly drivers: string[];

  constructor(name: string, color: string, country: string, drivers: string[]) {
    this.name = name;
    this.color = color;
    this.country = country;
    this.drivers = drivers;
  }

  static fromData(data: Prisma.ConstructorGetPayload<{}>) {
    return new ConstructorEntity(data.name, data.color, data.country, data.drivers);
  }
}
