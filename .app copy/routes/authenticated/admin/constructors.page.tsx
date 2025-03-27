import { Table, type TableProps } from 'antd';
import { useState } from 'react';
import type { ActionFunctionArgs } from 'react-router';
import { useFetcher, useLoaderData, useSubmit, type LoaderFunctionArgs } from 'react-router';
import { UpsertConstructorModalForm, type CreateDriverRequest } from '~/components/modals/create-driver.modal.component';
import { ConstructorCollection } from '~/database/collections/constructor.collection.server';
import type { ConstructorEntity } from '~/database/entities/constructor.entity';
import { jsonResponse } from '~/utils/responses';

const columns: TableProps<ConstructorEntity>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Drivers',
    dataIndex: 'drivers',
    key: 'drivers',
  },
] as const;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const drivers = formData.get('drivers');
  const color = formData.get('color');
  const country = formData.get('country');

  if (!name || !color || !country) {
    return jsonResponse({ error: 'Missing required fields' }, { status: 400 });
  }

  const constructor = await ConstructorCollection.create({
    name: name as string,
    color: color as string,
    country: country as string,
    drivers: [],
  });

  return constructor;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const constructors = await ConstructorCollection.getAll();

  return {
    constructors,
  };
};

export default function AdminConstructorsPage() {
  const { constructors } = useLoaderData<typeof loader>();
  const { submit: createConstructor } = useFetcher<typeof action>();

  const [createConstructorModal, setCreateConstructorModal] = useState(false);

  const onSubmitCreateConstructor = async (data: CreateDriverRequest) => {
    await createConstructor(
      { ...data },
      {
        method: 'post',
      }
    );
  };

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
      <UpsertConstructorModalForm
        action="/admin/constructors"
        method="post"
        open={createConstructorModal}
        onCancel={() => setCreateConstructorModal(false)}
        onSubmit={onSubmitCreateConstructor}
      />
      <Table dataSource={constructors} columns={columns} />;
    </main>
  );
}
