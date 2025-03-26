import { useState } from 'react';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { ConstructorCollection } from '~/collections/constructor.collection.server';
import { Modal } from '~/components/modal.component';
import { CreateConstructorModalForm } from '~/components/modals/create-driver.modal.component';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const constructors = await ConstructorCollection.getAll();

  return {
    constructors,
  };
};

export default function AdminConstructorsPage() {
  const { constructors } = useLoaderData<typeof loader>();

  const [createConstructorModal, setCreateConstructorModal] = useState(false);

  return (
    <main className="flex flex-col">
      <h2 className="text-2xl mb-4">Constructors</h2>
      <button
        onClick={() => setCreateConstructorModal(!createConstructorModal)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>
      <CreateConstructorModalForm open={createConstructorModal} onCancel={() => setCreateConstructorModal(false)} />
      {constructors.map((constructor) => (
        <div key={constructor.id} className="mt-4">
          <h3>{constructor.name}</h3>
          <p>{constructor.drivers}</p>
        </div>
      ))}
    </main>
  );
}
