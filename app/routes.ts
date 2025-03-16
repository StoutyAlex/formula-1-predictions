import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/welcome.page.tsx'),
  route('/login', './routes/login.page.tsx'),
  route('/logout', './routes/api/logout.api.ts'),

  // Logged in
  layout('./routes/auth-guard.layout.tsx', [
    route('/home', './routes/authenticated/home.page.tsx'),

    // Leagues
    ...prefix('/league', [
      route('/create', './routes/authenticated/create-league.page.tsx'),
      route('/:leagueId', './routes/authenticated/league.page.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
