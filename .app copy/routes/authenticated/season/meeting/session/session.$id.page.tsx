import { useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Session } from '~/services/formula-one/models/session.model';
import { jsonResponse } from '~/utils/responses';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const sessionKey = params.sessionKey;
  const meetingKey = params.meetingKey;
  if (!sessionKey || !meetingKey) return jsonResponse({}, { status: 404 });

  const session = await Session.getSession(Number(sessionKey));

  return {
    session,
  };
};

export default function SessionPage() {
  const { session } = useLoaderData<typeof loader>();

  const data = useRouteLoaderData('/season/:year');

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>
      <h2 className="text-2xl mb-4">Session details</h2>
      <div key={session.name} className="mt-4">
        <h3>{session.countryName}</h3>
        <p>{session.name}</p>
      </div>

      {session.positions?.map((position) => (
        <div key={position.driver.driverNumber} className="mt-4">
          <h3>{position.driver.name}</h3>
          <p>{position.position}</p>
          <p>{position.date.toISOString()}</p>
        </div>
      ))}
    </main>
  );
}
