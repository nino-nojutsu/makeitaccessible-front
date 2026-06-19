import { useRouter } from 'next/router';
import Head from 'next/head';
import Audit from '../../components/audit/Audit';

function AuditViewPage() {
  const router = useRouter();
  const { audit } = router.query;

  return (
    <>
      <Head>
        <title>{audit}/ MakeItAccessible</title>
      </Head>
      <Audit isArchive={true} />
    </>
  );
}

export default AuditViewPage;
