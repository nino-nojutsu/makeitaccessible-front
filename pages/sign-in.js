import Head from 'next/head';
import SignIn from '../components/modals/SignIn';

function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign-in / MakeItAccessible</title>
      </Head>
      <SignIn />
    </>
  );
}

export default SignInPage;
