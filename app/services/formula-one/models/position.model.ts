import { Session } from 'inspector/promises';
import { OpenF1Repo } from '~/services/third-party/open-f1/open-f1.repo.server';
import type { F1Position } from '~/services/third-party/open-f1/types/open-f1.types';
import { errorResponse } from '~/utils/responses';
import { Driver } from './driver.model';

export class Position {
  private readonly of1Position: F1Position;

  public readonly date: Date;
  public readonly driver: Driver;
  public readonly position: number;
  public readonly meetingKey: number;
  public readonly sessionKey: number;

  private constructor(position: F1Position, driver: Driver) {
    this.of1Position = position;

    this.driver = driver;
    this.position = this.of1Position.position;
    this.meetingKey = this.of1Position.meeting_key;
    this.sessionKey = this.of1Position.session_key;
    this.date = new Date(this.of1Position.date);
  }

  static async getPositions(sessionKey: number) {
    const positions = await Position.getPositionData(sessionKey);

    const driverNumbers = new Set<number>();

    positions.forEach((position) => {
      driverNumbers.add(position.driver_number);
    });

    const numbers = Array.from(driverNumbers);
    const drivers = await Promise.all(
      numbers.map((driverNumber) => {
        return Driver.getDriver({ sessionKey, driverNumber });
      })
    );

    return positions.map((position) => {
      const driver = drivers.find((driver) => driver.driverNumber === position.driver_number);
      if (!driver) {
        throw errorResponse('Could not find driver', { status: 500 });
      }

      return new Position(position, driver);
    });
  }

  private static async getPositionData(sessionKey: number) {
    const positions = await OpenF1Repo.getPositions({ sessionKey });
    if (!positions) throw errorResponse('Could not find session', { status: 404 });

    return positions;
  }
}
