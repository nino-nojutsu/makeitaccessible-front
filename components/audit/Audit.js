import styles from '../../styles/Audit.module.css';
import { useRouter } from "next/router";
import Results from './Results.js';
import Category from './Category.js';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Filters from './Filters.js';
import HeroAudit from './HeroAudit.js';
import AnalysePartielle from './AnalysePartielle.js';
import ImpactBlocks from '../ImpactBlocks.js';

function Audit({ isArchive }) {
  const router = useRouter();
  // Récupère les infos de l'audit depuis le store redux (key makeitaccessible stocké en localStorage)
  const user = useSelector((state) => state.user.value);
  const audit = useSelector((state) => state.audit.value);
  // console.log('audit', audit);

  // Si un audit n'existe pas on redirige vers la home
  if (audit === null) {
    router.push('/');
    return;
  }

  /** state **/
  const [selectedCat, setSelectedCat] = useState(''); // Images | Cadres | Couleurs | Tableaux | etc...
  const [selectedType, setSelectedType] = useState('all'); // all | inapplicable | passes | incompleted | violations
  const [selectedImpact, setSelectedImpact] = useState('all'); // all | critical | serious | moderate | minor

  /** comportements **/
  // Fonction (idf) de filtrage par categorie déclenché un click sur une cat (composant Catégorie + idf)
  const handleFilteredByCat = (category) => {
    category === 'allCats' ? setSelectedCat('') : setSelectedCat(category);
    setSelectedType('all');
    setSelectedImpact('all');
  }

  // Fonction (idf) de filtrage par type qui récupère le type souhaité via l'event onChange du Select (antd) : maj du state selectedType
  const handleFilteredByType = (value) => {
    setSelectedType(value);
  };

  // Fonction (idf) de filtrage par criticité qui récupère le type de criticité souhaité via l'event onChange du Select (antd) : maj du state selectedImpact
  const handleFilteredByImpact = (value) => {
    setSelectedImpact(value);
  }

  let categoriesList, violations, incomplete, passes, processed;
  if (user.token && audit.tests !== null) {
    // 1. Filtrer par catégorie ou pas : soit on récupère les tests d'une catégorie si un catégorie est séléctionnée soit on stock tous les tests (ternaire)
    const filteredByCat = selectedCat ? audit.tests.filter(test => test.category === selectedCat) : audit.tests;
    // console.log('filteredByCat', filteredByCat);

    // 2. Pré-filtrage par type à partir des catégories filtrées (par catégorie sélectionnée ou toutes catégories confondues)
    //
    // Depuis un filtrage de cat, récupère les violations (array non vide)
    violations = filteredByCat.length > 0 && filteredByCat.filter(test => test.violations.length > 0);
    // Depuis un filtrage de cat, récupère les incomplete (array non vide)
    incomplete = filteredByCat.length > 0 && filteredByCat.filter(test => test.incomplete.length > 0);
    // Depuis un filtrage de cat, récupère les passes (array non vide)
    passes = filteredByCat.length > 0 && filteredByCat.filter(test => test.passes.length > 0);
    // Depuis un filtrage de cat, récupère les tests si au moins une de ses rules est en status "validated" (et cela quelque soit le type)
    processed = filteredByCat.length > 0 && filteredByCat.filter(test => {
      return test.violations.some(rule => rule.status === 'validated')
    });

    // On crée un tableau de composants Category + Inverse Data Flow passé en props (handleFilteredByCat) depuis audit.tests
    categoriesList = audit.tests.length > 0 && audit.tests.map((data, i) => {
      // Affiche la class isSelected ou pas
      const isSelected = data.category === selectedCat;
      // Compte le nombre total d'anomalie : incomplete + violations
      const totalIssues = data.incomplete.length + data.violations.length;
      // Récupère le nombre de tests validés
      const totalPasses = data.passes.length;
      // A uniquement des non applicables dans les résultats
      const hasInapplicable = data.inapplicable.length > 0 && totalIssues + totalPasses === 0;
      // Composant Catégorie qui filtre par type et par criticité (passage par l'idf handleFilteredByCat)
      return <Category
        key={i}
        category={data.category}
        handleFilteredByCat={handleFilteredByCat}
        className={isSelected ? styles.isSelected : null}
        totalIssues={totalIssues}
        totalPasses={totalPasses}
        hasInapplicable={hasInapplicable} />
    });
  }

  /** affichage **/
  return (
    <>
      <HeroAudit isArchive={isArchive} />
      {user.token && audit.tests !== null ? (
        <div className={styles.auditContainer}>
          {/* Composant Catégorie qui filtre par thématique (Images, Cadres, Couleurs, etc...) */}
          {categoriesList !== undefined && categoriesList.length > 0 && (
            <aside role="navigation" className={styles.categoriesList}>
              <ol className={styles.listGroup}>
                {categoriesList}
              </ol>
              {
                selectedCat &&
                <span className={styles.showAll} onClick={() => handleFilteredByCat('allCats')}>
                  Afficher tous les résultats
                </span>
              }
            </aside>
          )}

          <div className={styles.auditResults}>
            {
              audit.tests.length > 0 && <ImpactBlocks tests={audit.tests} />
            }
            
            {/* Composant Filtres qui filtre par type et par criticité (passage par les idf handleFilteredByType et handleFilteredByImpact) */}
            {
              (violations.length > 0 || incomplete.length > 0) &&
              <Filters handleFilteredByType={handleFilteredByType} handleFilteredByImpact={handleFilteredByImpact} selectedCat={selectedCat} />
            }

            {/* Composant Results qui gère le switch entre les 3 sections (groupe les tests par violations, incomplete et passes) selon les filtres sélectionnés avec selectedType et selectedImpact */}
            {
              violations.length > 0 || incomplete.length > 0 ?
                <Results violations={violations} incomplete={incomplete} passes={passes} processed={processed} selectedType={selectedType} selectedImpact={selectedImpact} /> :
                <>
                  <div className={styles.noResults}>Nous n'avons pas trouvé d'anomalies pour cette thématique. <br />Bravo ! 😊</div>
                  <Results passes={passes} selectedType={selectedType} selectedImpact={selectedImpact} />
                </>
            }
          </div>
        </div>
      ) : (
      <AnalysePartielle />
    )}
  </>
);
}               

export default Audit;