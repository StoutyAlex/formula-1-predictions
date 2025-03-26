import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { DriverCollection } from "~/collections/driver.collection.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const drivers = await DriverCollection.getAll();

  return {
    drivers,
  };
}

export default function AdminDriverPage() {
  const { drivers } = useLoaderData<typeof loader>();

  return <main className="flex flex-col">
    <h2 className="text-2xl mb-4">Drivers</h2>
    {drivers.map((driver) => (
      <div key={driver.id} className="mt-4">
        <h3>{driver.name}</h3>
        <p>{driver.teamId}</p>
      </div>
    ))}
  </main>;
}
