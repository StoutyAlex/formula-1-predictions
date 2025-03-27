import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { useUser } from '~/contexts/user.context';
import { LeagueCollection } from '~/database/collections/league.collection.server';
import { requireAndGetUser } from '~/loader-functions/user.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireAndGetUser(request);
  const leagues = await LeagueCollection.getLeaguesForUser(user);

  return {
    leagues,
  };
};

export default function HomePage() {
  const { leagues } = useLoaderData<typeof loader>();
  const { user } = useUser();

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>

      <div className="mt-2">Welcome {user.username}</div>
      <div>Formula one predictor</div>

      <div className="mt-4 mb-2">Leagues</div>
      {leagues.map((league) => (
        <Link to={`/league/${league.id}`} key={league.id}>
          {league.name}
        </Link>
      ))}

      <Link to="/league/create" className="mt-4">
        Create a league
      </Link>
      <Link to="/league/join" className="mt-4">
        Join a league
      </Link>
    </main>
  );
}
