import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Meeting } from '~/services/formula-one/models/meeting.model';
import { errorResponse, jsonResponse } from '~/utils/responses';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const meetingKey = params.meetingKey;
  if (!meetingKey) return jsonResponse({}, { status: 404 });

  const meeting = await Meeting.getMeeting(Number(meetingKey));
  if (!meeting) throw errorResponse('Could not find season', { status: 404 });

  return {
    meeting,
  };
};

export default function SeasonPage() {
  const { meeting } = useLoaderData<typeof loader>();

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>

      <h2 className="text-2xl mb-4">Meeting details</h2>
      {
        <div key={meeting.name} className="mt-4">
          <h3>{meeting.location}</h3>
          <p>{meeting.officialName}</p>
          <p>{meeting.meetingKey}</p>
        </div>
      }

      {meeting.sessions.map((session) => (
        <div key={session.name} className="mt-4">
          <h3>{session.countryName}</h3>
          <p>{session.name}</p>
        </div>
      ))}
    </main>
  );
}
