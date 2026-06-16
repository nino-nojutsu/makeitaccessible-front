import Head from 'next/head';
import MonCompte from '../components/Dashboard/MonCompte';

function MonComptePage() {
  return (
    <>
      <Head>
        <title>Mon compte / MakeItAccessible</title>
      </Head>
      <MonCompte />
    </>
  );
}

export default MonComptePage;
