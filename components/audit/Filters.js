import styles from '../../styles/Filters.module.css';
import { Select, Space } from 'antd';

function Filters(props) {
  // Liste des types par défaut
  const types = [
    { value: 'all', label: 'Tout' },
    { value: 'violations', label: 'Anomalies' },
    { value: 'incomplete', label: 'Anomalies incomplètes' },
    { value: 'passes', label: 'Validés' },
    { value: 'inapplicable', label: 'Inapplicables' },
  ]

  // Impact de criticité (obligé de traduire car axe-core les envoie en anglais)
  const impact = {
    critical: 'Critique',
    serious:  'Majeur',
    moderate: 'Modéré',
    minor:    'Mineur',
  }

  const impacts = [
    {value: 'all', label: 'Tout'},
    {value: 'critical', label: 'Critique'},
    {value: 'serious', label: 'Majeur'},
    {value: 'moderate', label: 'Modéré'},
    {value: 'minor', label: 'Mineur'},
]
  
  /** states **/

  /** comportements **/

  // Fonction de filtrage par type qui récupère le type souhaité via l'event onChange du Select (antd) : maj du state selectedType
  const handleFilteredByType = (value) => {
    setSelectedType(value);
  };

  // Fonction de filtrage par criticité qui récupère le type de criticité souhaité via l'event onChange du Select (antd) : maj du state selectedImpact
  const handleFilteredByImpact = (value) => {
    setSelectedImpact(value);
  }

  /** affichage **/
  return (
    <div className={styles.auditActionsTools}>
      <Space wrap direction="vertical">
        <span>Filtrer par type d'anomalie</span>
        <Select
          defaultValue="all"
          style={{ width: 220, marginBottom: '12px', marginRight: '12px' }}
          allowClear
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
          allowClear
          onChange={(value) => props.handleFilteredByImpact(value)}
          options={impacts}
          placeholder="Filtrer par criticité"
        />
      </Space>
    </div>
  )
}

export default Filters;