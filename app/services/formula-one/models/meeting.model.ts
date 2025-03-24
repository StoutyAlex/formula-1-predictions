import { OpenF1Repo } from '~/services/third-party/open-f1/open-f1.repo.server';
import type { F1Meeting, F1Session } from '~/services/third-party/open-f1/types/open-f1.types';
import { Cache } from '~/utils/decorators/cache.server';
import { Session } from './sessions.model';

interface IMeeting {
  meetingKey: number;
  name: string;
  officialName: string;
  location: string;
}

export class Meeting implements IMeeting {
  private of1Meeting: F1Meeting;

  public readonly sessions: Session[];
  public readonly meetingKey: number;
  public readonly name: string;
  public readonly officialName: string;
  public readonly location: string;

  private constructor(meeting: F1Meeting, sessions: Session[]) {
    this.of1Meeting = meeting;
    this.sessions = sessions;

    const transformed = this.transformFromOf1(meeting.meeting_key);

    this.meetingKey = transformed.meetingKey;
    this.name = transformed.name;
    this.officialName = transformed.officialName;
    this.location = transformed.location;
  }

  private transformFromOf1(meetingKey: number | string) {
    return {
      meetingKey: Number(meetingKey),
      name: this.of1Meeting.meeting_name,
      officialName: this.of1Meeting.meeting_official_name,
      location: this.of1Meeting.location,
    };
  }

  static async getMeetings(year: string) {
    const sessions = await OpenF1Repo.getMeetings(year);
    if (!sessions) throw new Error(`Could not find meetings for year: ${year}`);

    const meetings = sessions.map((meeting) => Meeting.getMeeting(meeting.meeting_key));
    return Promise.all(meetings);
  }

  static async getMeeting(meetingKey: number) {
    const data = await this.getMeetingData(meetingKey);
    const { meeting, sessions } = data;

    return new Meeting(meeting, sessions);
  }

  private static async getMeetingData(meetingKey: number) {
    const [meeting, sessions] = await Promise.all([OpenF1Repo.getMeeting(meetingKey), Session.getSessions(meetingKey)]);
    if (!meeting || !sessions) throw new Error(`Error creating meeting from data: ${meetingKey}`);
    return { meeting, sessions };
  }
}
