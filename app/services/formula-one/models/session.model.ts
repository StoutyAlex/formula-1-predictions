import { OpenF1Repo } from '~/services/third-party/open-f1/open-f1.repo.server';
import type { F1Session } from '~/services/third-party/open-f1/types/open-f1.types';
import { errorResponse } from '~/utils/responses';
import { Position } from './position.model';

export class Session {
  private readonly of1Session: F1Session;
  public readonly positions: Position[];

  public readonly name: string;
  public readonly countryName: string;

  private constructor(of1Session: F1Session, positions: Position[]) {
    this.of1Session = of1Session;

    this.name = this.of1Session.session_name;
    this.countryName = this.of1Session.country_name;

    // TODO: Order positions by position
    // TODO: Get latest position by driver

    this.positions = this.orderPositions(positions);
  }

  private orderPositions(positions: Position[]) {
    const ordered = positions.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }

      if (a.date < b.date) {
        return -1;
      }

      return a.position - b.position;
    });

    return ordered;
    // return ordered.find((position) => position.driver.driverNumber === driverNumber);
  }

  static async getSession(sessionKey: number) {
    const { session, positions } = await Session.getSessionData(sessionKey);
    return new Session(session, positions);
  }

  static async getSessions(meetingKey: number) {
    const allSessions = await OpenF1Repo.getSessions({ meetingKey });
    if (!allSessions) throw errorResponse('Could not find sessions', { status: 404 });

    const sessions = allSessions.map((session) => Session.getSession(session.session_key));
    return Promise.all(sessions);
  }

  private static async getSessionData(sessionKey: number) {
    const session = await OpenF1Repo.getSession(sessionKey);
    const positions = await Position.getPositions(sessionKey);
    if (!session || !positions) throw errorResponse('Could not find session', { status: 404 });

    return { session, positions };
  }
}
