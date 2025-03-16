import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  index('routes/welcome.page.tsx'),
  route('/login', './routes/login.page.tsx'),

  // Logged in
  layout('./routes/auth-guard.layout.tsx', [route('/home', './routes/authenticated/home.page.tsx')]),
] satisfies RouteConfig;
