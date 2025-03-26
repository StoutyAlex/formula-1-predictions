import { OpenF1Repo } from '~/services/third-party/open-f1/open-f1.repo.server';
import type { F1Driver } from '~/services/third-party/open-f1/types/open-f1.types';
import { errorResponse } from '~/utils/responses';

interface GetDriverParams {
  sessionKey: number;
  driverNumber: number;
}

export class Driver {
  private readonly of1Drivers: F1Driver[];

  public readonly name: string;
  public readonly driverNumber: number;

  private constructor(drivers: F1Driver[]) {
    this.of1Drivers = drivers;

    const driver = this.of1Drivers[0];

    this.name = driver.name_acronym;
    this.driverNumber = driver.driver_number;
  }

  static async getDriver(params: GetDriverParams) {
    const drivers = await Driver.getDriverData(params);

    return new Driver(drivers);
  }

  private static async getDriverData(params: GetDriverParams) {
    const drivers = await OpenF1Repo.getDriver(params);
    if (!drivers) throw errorResponse('Could not find session', { status: 404 });

    return drivers;
  }
}
