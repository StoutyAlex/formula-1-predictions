export function AdminHeader() {
  return (
    <div className="flex bg-gray-500 w-full p-4 h-18 flex-row justify-between absolute top-0">
      <div>
        <h2 className="text-3xl">F1P Admin Panel</h2>
      </div>
      <div className="bg-gray-700 rounded-lg p-2">
        <form method="post" action="/logout">
          <button type="submit">Sign out</button>
        </form>
      </div>
    </div>
  );
}
