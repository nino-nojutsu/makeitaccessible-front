import Head from 'next/head';
import GoogleLogin from '../components/GoogleLogin';

function GoogleAuthPage() {
  return (
    <>
      <Head>
        <title>Google Auth / MakeItAccessible</title>
      </Head>
      <GoogleLogin />
    </>
  );
}

export default GoogleAuthPage;
