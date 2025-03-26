import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/welcome.page.tsx'),
  route('/login', './routes/login.page.tsx'),
  route('/logout', './routes/api/logout.api.ts'),

  // Logged in
  layout('./routes/auth-guard.layout.tsx', [
    route('/home', './routes/authenticated/home.page.tsx'),

    // Admin
    layout('./routes/authenticated/admin/admin.layout.tsx', [
      route('/admin', './routes/authenticated/admin/admin.page.tsx'),
      route('/admin/drivers', './routes/authenticated/admin/drivers.page.tsx'),
      route('/admin/users', './routes/authenticated/admin/users.page.tsx'),
    ]),

    // F1 Info
    ...prefix('/season', [
      route('/:year', './routes/authenticated/season/season.$year.page.tsx'),
      route('/:year/meeting/:meetingKey', './routes/authenticated/season/meeting/meeting.$id.page.tsx'),
      route(
        '/:year/meeting/:meetingKey/session/:sessionKey',
        './routes/authenticated/season/meeting/session/session.$id.page.tsx'
      ),
    ]),

    // Leagues
    ...prefix('/league', [
      route('/create', './routes/authenticated/league/create.page.tsx'),
      route('/:leagueId', './routes/authenticated/league/league.page.tsx'),
      route('/join', './routes/authenticated/league/join.page.tsx'),
      route('/leave/:leagueId', './routes/authenticated/league/api/leave.api.ts'),
    ]),
  ]),
] satisfies RouteConfig;
