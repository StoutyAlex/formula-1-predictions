import { useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from 'react-router';
import { OpenF1Repo } from '~/services/third-party/open-f1/open-f1.repo.server';
import { jsonResponse } from '~/utils/responses';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const sessionKey = params.sessionKey;
  const meetingKey = params.meetingKey;
  if (!sessionKey || !meetingKey) return jsonResponse({}, { status: 404 });

  const session = await OpenF1Repo.getSession(Number(sessionKey));
  const drivers = await OpenF1Repo.getDrivers({
    sessionKey: Number(sessionKey),
    meetingKey: Number(meetingKey),
  });

  return {
    session,
    drivers,
  };
};

export default function SessionPage() {
  const { drivers, session } = useLoaderData<typeof loader>();

  const data = useRouteLoaderData('/season/:year');

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>
      <h2 className="text-2xl mb-4">Session details</h2>
      <div key={session.session_key} className="mt-4">
        <h3>{session.session_name}</h3>
        <p>{session.session_key}</p>
        <p>{session.session_type}</p>
      </div>

      <div>Total Positions: {drivers?.length}</div>

      {drivers?.map((driver) => (
        <div key={driver.driver_number} className="mt-4">
          <h3>{driver.full_name}</h3>
          <p>{driver.driver_number}</p>
          <p>{driver.team_name}</p>
        </div>
      ))}
    </main>
  );
}
