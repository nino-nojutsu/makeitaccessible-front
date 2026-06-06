import styles from '../../styles/Audit.module.css';
import { Select, Space } from 'antd';
import { useRouter } from "next/router";
import Tests from './Tests.js';
import Category from './Category.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Audit() {
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

  /** state **/
  const auditData = useSelector((state) => state.audit.value);
  const [selectedCat, setSelectedCat] = useState(''); // Images | Cadres | Couleurs | Tableaux | etc...
  const [selectedType, setSelectedType] = useState('all'); // all | inapplicable | passes | incompleted | violations
  const [tests, setTests] = useState(auditData.audit.tests); // Par défault, on initialise le state "tests" avec tous les résultats des tests
  const [incomplete, setIncomplete] = useState([]);
  const [passes, setPasses] = useState([]);
  const [violations, setViolations] = useState([]);

  /** comportements **/
  const website = auditData.website;
  const audit = auditData.audit;

  useEffect(() => {
    // Filtre les résultats par type d'anomalies
    const violationsType = audit.tests
      .filter(test => test.violations.length > 0)
      .map((test, i) => {
        const obj = { category: test.category, rules: test.violations };
        return <Tests key={i} {...obj} />
      });
    
    setViolations(violationsType);
    // Filtre les résultats par type d'anomalies incomplètes
    const incompleteType = audit.tests
      .filter(test => test.incomplete.length > 0)
      .map((test, i) => {
        const obj = { category: test.category, rules: test.incomplete }
        return <Tests key={i} {...obj} />
      });
    setIncomplete(incompleteType);
    
    // Filtre les résultats par type validés
    const passesType = audit.tests
      .filter(test => test.passes.length > 0)
      .map((test, i) => {
        const obj = { category: test.category, rules: test.passes }
        return <Tests key={i} {...obj} />
      });
    setPasses(passesType);
  }, [selectedCat, selectedType]);

  const handleFilteredByCat = (category) => {
    // On met à jour le state category
    // console.log('category', category);
    setSelectedCat(category);

    // On filtre d'abord par catégorie : le résultat est un tableau (cf. methode filter JS) qui récupère correspondant à la catégorie choisie : 
    // [0: {category: 'Images', inapplicable: [...], passes: [...], ...}]
    const testsFilteredByCat = tests.filter(test => test.category === category);
    console.log('testsFilteredByCat', testsFilteredByCat);
    // console.log('selectedType', selectedType);
    // console.log('testsFilteredByCat[0][selectedType]', testsFilteredByCat[0][selectedType]);
    
    // On filtre par type (inapplicable | passes | incomplete | violations) en passant le state en "propriété/variable dynamique" => d'où les crochets
    const testsFilteredByType = testsFilteredByCat[0][selectedType];
    // console.log('testsFilteredByType', testsFilteredByType);

    // On met à jour le state tests avec les résultats filtrés à la fois par catégorie et par type: nouveau tableau "spreadé" pour crée une nouvelle référence => donc déclenchera le re-render
    setTests([...testsFilteredByType]);
    // console.log('tests', tests);
  }

  // Select type
  // console.log('selectedType', selectedType);
  const handleChange = value => {
    setSelectedType(value);
  };

  // On crée un tableau de composants Category + Inverse Data Flow passé en props (handleFilteredByCat)
  const categoriesList = tests && tests.map((data, i) => {
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
              onChange={handleChange}
              options={types}
            />
          </Space>
          
          {violations.length > 0 && (
            <>
              <h3>Anomalies</h3>
              {violations}
            </>
          )}

          {incomplete.length > 0 && (
            <>
              <h3>Anomalies incomplètes</h3>
              {incomplete}
            </>
          )}

          {passes.length > 0 && (
            <>
              <h3>Validés</h3>
              {passes}
            </>
          )}
        </>
      </div>
    </div>
  )
}

export default Audit;