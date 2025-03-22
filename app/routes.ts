import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/welcome.page.tsx'),
  route('/login', './routes/login.page.tsx'),
  route('/logout', './routes/api/logout.api.ts'),

  // Logged in
  layout('./routes/auth-guard.layout.tsx', [
    route('/home', './routes/authenticated/home.page.tsx'),

    // Seasons
    ...prefix('/season', [route('/:year', './routes/authenticated/season/$year.page.tsx')]),

    // Leagues
    ...prefix('/league', [
      route('/create', './routes/authenticated/league/create.page.tsx'),
      route('/:leagueId', './routes/authenticated/league/league.page.tsx'),
      route('/join', './routes/authenticated/league/join.page.tsx'),
      route('/leave/:leagueId', './routes/authenticated/league/api/leave.api.ts'),
    ]),
  ]),
] satisfies RouteConfig;
