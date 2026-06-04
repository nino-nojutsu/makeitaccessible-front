/*
** Audit page to display the audit results and fetch all the violations **
*/

import Head from "next/head";
import Image from "next/image";
import Audit from "../components/audit/Audit";

function AuditPage() {
  return (
    <>
      <Head>
        <title>Audit | MakeItAccessible</title>
        <link rel="icon" href="/favicon-makeitaccessible.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Les résultats de l'analyse de l'audit"
        />
        <meta
          name="keywords"
          content="Accessibilité, RGAA 4.4.1, a11y, Spécifications WAI-ARIA, Audit d'accessibilité, Bonnes pratiques de l'accessibilité"
        />
        <meta name="author" content="La C@psule Team" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="French" />
      </Head>
      <Audit />
    </>
  );
}

export default AuditPage;
