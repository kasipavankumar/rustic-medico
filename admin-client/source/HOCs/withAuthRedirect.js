import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../providers/Auth';

function LoadingFallback() {
  return <p>Loading...</p>;
}

export default function withAuthRedirect({ WrappedComponent, LoadingComponent = LoadingFallback, expectedAuth, location }) {
  const WithAuthRedirectWrapper = (props) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (typeof window !== undefined && expectedAuth !== isAuthenticated) {
        router.push(location);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirectWrapper;
}
