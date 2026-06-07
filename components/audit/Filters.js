import styles from '../../styles/Filters.module.css';
import { Select, Space } from 'antd';

function Filters(props) {
  // Liste des types par défaut pour le Select (state selectedType se mettront à jour dans Audit via idf)
  const types = [
    { value: 'all', label: 'Tout' },
    { value: 'violations', label: 'Anomalies' },
    { value: 'incomplete', label: 'Anomalies incomplètes' },
    { value: 'passes', label: 'Validés' },
    { value: 'inapplicable', label: 'Inapplicables' },
  ]

  // Liste des criticité par défaut pour le Select (state selectedImpact se mettront à jour dans Audit via idf)
  const impacts = [
    {value: 'all', label: 'Tout'},
    {value: 'critical', label: 'Critique'},
    {value: 'serious', label: 'Majeur'},
    {value: 'moderate', label: 'Modéré'},
    {value: 'minor', label: 'Mineur'},
]
  
  /** states **/

  /** comportements **/

  /** affichage **/
  return (
    <div className={styles.auditActionsTools}>
      <Space wrap direction="vertical">
        <span>Filtrer par type d'anomalie</span>
        <Select
          defaultValue="all"
          style={{ width: 220, marginBottom: '12px', marginRight: '12px' }}
          onChange={(value) => props.handleFilteredByType(value)}
          options={types}
          placeholder="Filtrer par type d'anomalie"
        />
      </Space>

      <Space wrap direction="vertical">
        <span>Filtrer par criticité</span>
        <Select
          defaultValue="all"
          style={{ width: 220, marginBottom: '12px' }}
          onChange={(value) => props.handleFilteredByImpact(value)}
          options={impacts}
          placeholder="Filtrer par criticité"
        />
      </Space>
    </div>
  )
}

export default Filters;