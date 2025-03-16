import { useState } from 'react';
import { redirect, useActionData, type ActionFunctionArgs } from 'react-router';
import { FormField } from '~/components/form-field';
import { createLeague } from '~/loader-functions/league.server';
import { requireUserId } from '~/loader-functions/user.server';
import { errorResponse } from '~/utils/responses';

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const form = await request.formData();

  const leagueName = form.get('leagueIdentifier');

  if (typeof leagueName !== 'string') {
    return errorResponse('Invalid league name', { status: 400 });
  }

  const league = await createLeague(leagueName, userId);
  return redirect(`/league/${league.id}`);
};

export default function CreateLeaguePage() {
  const actionData = useActionData<typeof action>();

  const [leagueName, setLeagueName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeagueName(event.target.value);
  };

  const createLeagueForm = (
    <>
      <form method="POST" className="mt-2 rounded-2xl bg-black-200 p-6 w-96 bg-gray-900 border-red-500 border-2">
        <FormField
          htmlFor="leagueIdentifier"
          label="League Name"
          value={leagueName}
          autocomplete="off"
          onChange={handleInputChange}
        />

        <div className="w-full text-center mt-2">
          <button type="submit" className="rounded-xl font-semibold text-red-400 px-3 py-2">
            Create league
          </button>
        </div>
      </form>
    </>
  );

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <form method="post" action="/logout">
        <button type="submit" className="absolute top-8 right-8 rounded-xl bg-black font-semibold text-red-400 px-3 py-2">
          Sign out
        </button>
      </form>

      <h2 className="text-2xl">{actionData ? 'Your league has been created!' : 'Create a League!'}</h2>

      {!actionData && createLeagueForm}
      {actionData && <div className="text-red-500">{JSON.stringify(actionData, null, 4)}</div>}
    </main>
  );
}
