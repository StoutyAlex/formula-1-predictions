import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction } from 'react-router';
import './app.css';
import type { Route } from './+types/root';

import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // TODO: Toggle this
  const [darkMode, setDarkMode] = useState(true);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ConfigProvider
          theme={{
            algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          {children}
        </ConfigProvider>
        <ScrollRestoration />
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status.toString();
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
