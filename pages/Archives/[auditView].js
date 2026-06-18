import { useRouter } from 'next/router';
import Head from 'next/head';
import Hashtag from '../../components/EspaceMembre/AuditViewPage';

function AuditViewPage() {
  const router = useRouter();
  const { audit } = router.query;

  return (
    <>
      <Head>
        <title>Détail de l'audit {site.name}/ MakeItAccessible</title>
      </Head>
      <Hashtag />
    </>
  );
}

export default AuditViewPage;
