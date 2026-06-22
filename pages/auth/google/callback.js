import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../../../reducers/user';

const getQueryValue = (value) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

function GoogleCallback() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { token, firstName, email } = router.query;
    const userToken = getQueryValue(token);
    const username = getQueryValue(firstName) || getQueryValue(email) || null;

    if (!userToken) {
      router.replace('/sign-in');
      return;
    }

    dispatch(
      login({
        token: userToken,
        username,
      })
    );

    router.replace('/mes-audits');
  }, [dispatch, router]);

  return null;
}

export default GoogleCallback;
