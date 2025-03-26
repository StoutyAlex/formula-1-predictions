import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import flowbiteReact from 'flowbite-react/plugin/vite';

export default defineConfig({
  plugins: [reactRouterDevTools(), tailwindcss(), reactRouter(), tsconfigPaths(), flowbiteReact()],
});
