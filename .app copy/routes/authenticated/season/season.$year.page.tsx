import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Meeting } from '~/services/formula-one/models/meeting.model';
import { errorResponse, jsonResponse } from '~/utils/responses';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const year = params.year;

  if (!year) return jsonResponse({}, { status: 404 });

  const meetings = await Meeting.getMeetings(year);
  if (!meetings) throw errorResponse('Could not find season', { status: 404 });

  return {
    meetings,
  };
};

export default function SeasonPage() {
  const { meetings } = useLoaderData<typeof loader>();

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>

      <h2 className="text-2xl mb-4">Season details 1</h2>

      {meetings.map((meeting) => (
        <div key={meeting.meetingKey} className="mt-4">
          <h3>{meeting.name}</h3>
          <p>{meeting.officialName}</p>
          <p>{meeting.location}</p>
        </div>
      ))}
    </main>
  );
}
