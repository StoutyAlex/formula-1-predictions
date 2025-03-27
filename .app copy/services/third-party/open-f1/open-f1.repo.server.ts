import { Cache } from '~/utils/decorators/cache.server';
import type { F1Driver, F1Position, F1Meeting, F1Session } from './types/open-f1.types';

interface GetSessionParams {
  year?: string;
  meetingKey?: number;
  sessionKey?: number;
}

interface GetDriversParams {
  meetingKey?: number;
  sessionKey?: number;
}

interface GetDriverParams {
  meetingKey?: number;
  driverNumber?: number;
  sessionKey?: number;
}

interface GetPositionsParams {
  meetingKey?: number;
  sessionKey?: number;
}

export class OpenF1Repo {
  @Cache('of1:repo:meeting')
  static async getMeeting(meetingKey: number | string) {
    const url = new URL(`https://api.openf1.org/v1/meetings`);
    url.searchParams.append('meeting_key', meetingKey.toString());

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Meeting[];
    if (!data.length) {
      return null;
    }

    return (data[0] as F1Meeting) || null;
  }

  @Cache('of1:repo:meetings')
  static async getMeetings(year: string) {
    const url = new URL(`https://api.openf1.org/v1/meetings`);
    url.searchParams.append('year', year);

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Meeting[];

    if (!data.length) {
      return null;
    }

    return data;
  }

  @Cache('of1:repo:sessions')
  static async getSessions(params: GetSessionParams) {
    const url = new URL(`https://api.openf1.org/v1/sessions`);
    params.meetingKey && url.searchParams.append('meeting_key', params.meetingKey.toString());
    params.sessionKey && url.searchParams.append('session_key', params.sessionKey.toString());
    params.year && url.searchParams.append('year', params.year);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!data.length) {
      return null;
    }

    return data as F1Session[];
  }

  @Cache('of1:repo:session')
  static async getSession(sessionKey: number) {
    const url = new URL(`https://api.openf1.org/v1/sessions`);
    url.searchParams.append('session_key', sessionKey.toString());

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Session[];
    return data[0] || null;
  }

  @Cache('of1:repo:positions')
  static async getPositions(params: GetPositionsParams) {
    const url = new URL(`https://api.openf1.org/v1/position`);
    params.meetingKey && url.searchParams.append('meeting_key', params.meetingKey.toString());
    params.sessionKey && url.searchParams.append('session_key', params.sessionKey.toString());

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Position[];

    if (!data.length) {
      return null;
    }

    return data;
  }

  @Cache('of1:repo:drivers')
  static async getDrivers(params: GetDriversParams) {
    const url = new URL(`https://api.openf1.org/v1/drivers`);
    params.meetingKey && url.searchParams.append('meeting_key', params.meetingKey.toString());
    params.sessionKey && url.searchParams.append('session_key', params.sessionKey.toString());

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Driver[];

    if (!data.length) {
      return null;
    }

    return data;
  }

  @Cache('of1:repo:driver')
  static async getDriver(params: GetDriverParams) {
    const url = new URL(`https://api.openf1.org/v1/drivers`);
    params.sessionKey && url.searchParams.append('session_key', params.sessionKey.toString());
    params.driverNumber && url.searchParams.append('driver_number', params.driverNumber.toString());

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Driver[];

    if (!data.length) {
      return null;
    }

    return data;
  }
}
