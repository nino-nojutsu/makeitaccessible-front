import styles from "../../styles/Audit.module.css";
import { useRouter } from "next/router";
import Results from "./Results.js";
import Category from "./Category.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Filters from "./Filters.js";
import Charts from "../charts.js";
import HeroAudit from "./HeroAudit.js";
import AnalysePartielle from "./AnalysePartielle.js";
import ImpactBlocks from "../ImpactBlocks.js";

function Audit({ isArchive }) {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const auditState = useSelector((state) => state.audit.value);

  const results = auditState?.results || null;
  const website = auditState?.website || null;
  const tests = Array.isArray(auditState?.tests) ? auditState.tests : [];

  const [selectedCat, setSelectedCat] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");

  useEffect(() => {
    if (!results) {
      router.replace("/");
    }
  }, [results, router]);

  if (!results) {
    return null;
  }

  const handleFilteredByCat = (category) => {
    category === "allCats" ? setSelectedCat("") : setSelectedCat(category);
    setSelectedType("all");
    setSelectedImpact("all");
  };

  const handleFilteredByType = (value) => {
    setSelectedType(value);
  };

  const handleFilteredByImpact = (value) => {
    setSelectedImpact(value);
  };

  let categoriesList = [];
  let violations = [];
  let incomplete = [];
  let passes = [];
  let processed = [];

  if (user.token) {
    const filteredByCat = selectedCat
      ? tests.filter((test) => test.category === selectedCat)
      : tests;

    violations = filteredByCat.filter((test) => test.violations.length > 0);
    incomplete = filteredByCat.filter((test) => test.incomplete.length > 0);
    passes = filteredByCat.filter((test) => test.passes.length > 0);
    processed = filteredByCat.filter((test) => test.status === "validated");

    categoriesList = tests.map((data, i) => {
      const isSelected = data.category === selectedCat;
      const totalIssues = data.incomplete.length + data.violations.length;
      const totalPasses = data.passes.length;
      const hasInapplicable =
        data.inapplicable.length > 0 && totalIssues + totalPasses === 0;

      return (
        <Category
          key={i}
          category={data.category}
          handleFilteredByCat={handleFilteredByCat}
          className={isSelected ? styles.isSelected : null}
          totalIssues={totalIssues}
          totalPasses={totalPasses}
          hasInapplicable={hasInapplicable}
        />
      );
    });
  }

  return (
    <>
      <HeroAudit isArchive={isArchive} />
      {user.token ? (
        <div className={styles.auditContainer}>
          {categoriesList.length > 0 && (
            <aside role="navigation" className={styles.categoriesList}>
              <ol className={styles.listGroup}>{categoriesList}</ol>
              {selectedCat && (
                <span
                  className={styles.showAll}
                  onClick={() => handleFilteredByCat("allCats")}
                >
                  Afficher tous les resultats
                </span>
              )}
            </aside>
          )}

          <div className={styles.auditResults}>
            <ImpactBlocks tests={tests} />

            {(violations.length > 0 || incomplete.length > 0) && (
              <Filters
                handleFilteredByType={handleFilteredByType}
                handleFilteredByImpact={handleFilteredByImpact}
                selectedCat={selectedCat}
              />
            )}

            {violations.length > 0 || incomplete.length > 0 ? (
              <Results
                violations={violations}
                incomplete={incomplete}
                passes={passes}
                processed={processed}
                selectedType={selectedType}
                selectedImpact={selectedImpact}
              />
            ) : (
              <>
                <div className={styles.noResults}>
                  Nous n'avons pas trouve d'anomalies pour cette thematique.
                  <br />
                  Bravo !
                </div>
                <Results
                  passes={passes}
                  selectedType={selectedType}
                  selectedImpact={selectedImpact}
                />
              </>
            )}

            <Charts audit={results} tests={tests} website={website} user={user} />
          </div>
        </div>
      ) : (
        <AnalysePartielle />
      )}
    </>
  );
}

export default Audit;
