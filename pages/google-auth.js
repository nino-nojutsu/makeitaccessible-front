import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

function GoogleAuthPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const { token, firstName, username } = router.query;

    if (!router.isReady) {
      return;
    }

    if (token) {
      dispatch(
        login({
          token,
          firstName: firstName || '',
          username: username || '',
        })
      );

      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [router.isReady, router.query, dispatch, router]);

  return null;
}

export default GoogleAuthPage;