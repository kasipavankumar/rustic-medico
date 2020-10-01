import withAuthRedirect from './withAuthRedirect';

export default function withAuth(WrappedComponent, location = '/login') {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  });
}
