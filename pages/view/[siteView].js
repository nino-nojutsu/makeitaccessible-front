import { useRouter } from 'next/router';
import Head from 'next/head';
import Audit from '../../components/audit/Audit';

function SiteViewPage() {
  const router = useRouter();
  const { site } = router.query;

  return (
    <>
      <Head>
        <title>{site}/ MakeItAccessible</title>
      </Head>
      <Audit isArchive={true} />
    </>
  );
}

export default SiteViewPage;
