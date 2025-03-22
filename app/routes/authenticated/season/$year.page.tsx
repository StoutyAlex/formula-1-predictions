import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { F1Data } from '~/services/f1-seasons.server';
import { errorResponse, jsonResponse } from '~/utils/responses';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const year = params.year;
  if (!year) return jsonResponse({}, { status: 404 });

  const season = await F1Data.getSeason(year);
  if (!season) throw errorResponse('Could not find season', { status: 404 });

  return {
    season,
  };
};

export default function SeasonPage() {
  const { season } = useLoaderData<typeof loader>();

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>

      <h2 className="text-2xl mb-4">Season details</h2>

      {season.map((meeting) => (
        <div key={meeting.meeting_key} className="mt-4">
          <h3>{meeting.meeting_name}</h3>
          <p>{meeting.meeting_key}</p>
          <p>{meeting.circuit_key}</p>
        </div>
      ))}
    </main>
  );
}
