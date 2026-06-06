import styles from '../../styles/Audit.module.css';
import { Select, Space } from 'antd';
import { useRouter } from "next/router";
import Results from './Results.js';
import Category from './Category.js';
import Tests from './Tests.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Audit() {
  const auditData = useSelector((state) => state.audit.value);
  const router = useRouter();

  // Si un audit n'existe pas on redirige vers la home
  if (auditData === null) {
    router.push('/');
  }

  // Default types
  const types = [
    { value: 'all', label: 'Tout' },
    { value: 'violations', label: 'Anomalies' },
    { value: 'incomplete', label: 'Anomalies incomplètes' },
    { value: 'passes', label: 'Validés' },
    { value: 'inapplicable', label: 'Inapplicables' },
  ]
  const audit = auditData.audit;
  const website = auditData.website;

  /** state **/
  const [selectedCat, setSelectedCat] = useState(''); // Images | Cadres | Couleurs | Tableaux | etc...
  const [selectedType, setSelectedType] = useState('all'); // all | inapplicable | passes | incompleted | violations

  /** comportements **/

  // 1. Filtrer par catégorie
  const filteredByCat = selectedCat ? audit.tests.filter(test => test.category === selectedCat) : audit.tests;
  // console.log('filteredByCat', filteredByCat);

  // 2. Filtrer par type à partir des catégories filtrées

  // Depuis un filtrage de cat, récupère les violations (array non vide)
  const violations = filteredByCat.length > 0 && filteredByCat.filter(test => test.violations.length > 0);
  // Depuis un filtrage de cat, récupère les incomplete (array non vide)
  const incomplete = filteredByCat.length > 0 && filteredByCat.filter(test => test.incomplete.length > 0);
  // Depuis un filtrage de cat, récupère les passes (array non vide)
  const passes = filteredByCat.length > 0 && filteredByCat.filter(test => test.passes.length > 0);

  // Select categorie
  const handleFilteredByCat = (category) => {
    setSelectedCat(category);
  }

  // Select type
  const handleFilteredByType = (value) => {
    setSelectedType(value);
  };

  // On crée un tableau de composants Category + Inverse Data Flow passé en props (handleFilteredByCat)
  const categoriesList = audit.tests.length > 0 && audit.tests.map((data, i) => {
    return <Category key={i} category={data.category} handleFilteredByCat={handleFilteredByCat} />
  });

  /** affichage **/
  return (
    <div className={styles.auditDetailsContainer}>
      { categoriesList.length > 0 && (
        <aside role="navigation" className={styles.categoriesList}>
          <ol className={styles.listGroup}>
            { categoriesList }
          </ol>
        </aside>
      )}
      
      <div className={styles.auditWrapper}>
        <>
          <Space wrap>
            <Select
              defaultValue="all"
              style={{ width: 180, marginBottom: '12px' }}
              onChange={handleFilteredByType}
              options={types}
            />
          </Space>
          
          {/* Results gère le switch entre les 3 sections selon le filtre sélectionné avec selectedType */}
          <Results
            violations={violations}
            incomplete={incomplete}
            passes={passes}
            selectedType={selectedType} />
        </>
      </div>
    </div>
  )
}

export default Audit;