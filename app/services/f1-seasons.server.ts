import { Cache } from '../utils/decorators/cache.server';
import type { F1Season, F1Session } from './types/open-f1.types';

interface GetSessionParams {
  year?: string;
  meetingKey?: number;
  sessionKey?: number;
}

export class F1Data {
  @Cache('f1:meeting')
  static async getMeeting(meetingKey: number | string) {
    const url = new URL(`https://api.openf1.org/v1/meetings`);
    url.searchParams.append('meeting_key', meetingKey.toString());

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Season[];
    if (!data.length) {
      return null;
    }

    return (data[0] as F1Season) || null;
  }

  @Cache('f1:meetings')
  static async getSeason(year: string) {
    const url = new URL(`https://api.openf1.org/v1/meetings`);
    url.searchParams.append('year', year);

    const response = await fetch(url.toString());
    const data = (await response.json()) as F1Season[];

    if (!data.length) {
      return null;
    }

    return data;
  }

  @Cache('f1:sessions')
  static async getSessions(params: GetSessionParams) {
    const url = new URL(`https://api.openf1.org/v1/sessions`);
    params.meetingKey && url.searchParams.append('meeting_key', params.meetingKey.toString());
    params.sessionKey && url.searchParams.append('session_key', params.sessionKey.toString());
    params.year && url.searchParams.append('year', params.year);

    const response = await fetch(url.toString());
    const data = await response.json();
    return data as F1Session[];
  }

  @Cache('f1:session')
  static async getSession(sessionKey: string) {
    const url = new URL(`https://api.openf1.org/v1/sessions`);
    url.searchParams.append('session_key', sessionKey);

    const response = await fetch(url.toString());
    const data = await response.json();
    return data as F1Session[];
  }

  @Cache('f1:driver')
  static async getDriver(driverKey: string) {
    const url = new URL(`https://api.openf1.org/v1/drivers`);
    url.searchParams.append('driver_key', driverKey);

    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  }
}
