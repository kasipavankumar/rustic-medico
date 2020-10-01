import withAuthRedirect from './withAuthRedirect';

export default function withoutAuth(WrappedComponent, location = '/') {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: false,
  });
}
