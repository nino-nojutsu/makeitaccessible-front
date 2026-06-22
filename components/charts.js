import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Progress,
  Row,
  Space,
  Tabs,
  Typography,
} from 'antd';
import styles from '../styles/Charts.module.css';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const severityLabels = [
  { key: 'critical', label: 'Critique' },
  { key: 'major', label: 'Majeur' },
  { key: 'minor', label: 'Mineur' },
];

const countOccurrences = (rule) => {
  if (Array.isArray(rule?.nodes) && rule.nodes.length > 0) {
    return rule.nodes.length;
  }

  return 1;
};

const getSeverity = (impact) => {
  if (impact === 'critical' || impact === 'serious') {
    return 'critical';
  }

  if (impact === 'moderate') {
    return 'major';
  }

  return 'minor';
};

const getAuditSummary = (audit, tests) => {
  const fallbackSummary = tests.reduce(
    (summary, test) => {
      summary.inapplicable += test.inapplicable?.length || 0;
      summary.passes += test.passes?.length || 0;
      summary.incomplete += test.incomplete?.length || 0;
      summary.violations += test.violations?.length || 0;
      return summary;
    },
    { inapplicable: 0, passes: 0, incomplete: 0, violations: 0 }
  );

  const summary = audit?.summary || fallbackSummary;
  const total = summary.total || summary.inapplicable + summary.passes + summary.incomplete + summary.violations;
  const score = typeof summary.score === 'number' ? summary.score : 0;

  return {
    ...summary,
    total,
    score,
  };
};

const buildCategoryData = (tests) =>
  tests.map((test) => {
    const totals = (test.violations || []).reduce(
      (acc, violation) => {
        const severity = getSeverity(violation.impact);
        acc[severity] += countOccurrences(violation);
        return acc;
      },
      { critical: 0, major: 0, minor: 0 }
    );

    return {
      label: test.category,
      ...totals,
    };
  });

const buildCriteriaData = (tests) => {
  const criteriaMap = new Map();

  tests.forEach((test) => {
    (test.violations || []).forEach((violation) => {
      const key = violation.id || violation.help || violation.description;
      const current = criteriaMap.get(key) || {
        label: violation.help || violation.description || violation.id || 'Critere sans libelle',
        value: 0,
        severity: getSeverity(violation.impact),
      };

      current.value += countOccurrences(violation);
      criteriaMap.set(key, current);
    });
  });

  return Array.from(criteriaMap.values())
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
};

const getTicks = (maxValue, count = 6) => {
  const roundedMax = Math.max(count, Math.ceil(maxValue / count) * count);
  const step = roundedMax / count;

  return Array.from({ length: count + 1 }, (_, index) => Math.round(roundedMax - step * index));
};

const formatDate = (date) => {
  if (!date) {
    return 'Audit en cours';
  }

  const formattedDate = new Date(date);

  if (Number.isNaN(formattedDate.getTime())) {
    return 'Audit en cours';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(formattedDate);
};

function Legend({ items }) {
  return (
    <div className={styles.legend}>
      {items.map((item) => (
        <span className={styles.legendItem} key={item.key}>
          <span className={`${styles.legendDot} ${styles[item.key]}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function CategoryChart({ categoryData }) {
  const maxCategoryValue = Math.max(
    1,
    ...categoryData.flatMap((category) => [category.critical, category.major, category.minor])
  );
  const ticks = getTicks(maxCategoryValue);
  const chartMax = ticks[0];

  return (
    <section className={styles.chartSection}>
      <Title level={3} className={styles.sectionTitle}>
        Repartition des anomalies par thematique RGAA
      </Title>

      <div className={styles.verticalChart}>
        <div className={styles.yAxis}>
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className={styles.categoryPlot}>
          {categoryData.map((category) => (
            <div className={styles.categoryGroup} key={category.label}>
              <div className={styles.barCluster}>
                <span
                  className={`${styles.verticalBar} ${styles.critical}`}
                  style={{ height: `${(category.critical / chartMax) * 100}%` }}
                />
                <span
                  className={`${styles.verticalBar} ${styles.major}`}
                  style={{ height: `${(category.major / chartMax) * 100}%` }}
                />
                <span
                  className={`${styles.verticalBar} ${styles.minor}`}
                  style={{ height: `${(category.minor / chartMax) * 100}%` }}
                />
              </div>
              <Text className={styles.categoryLabel}>{category.label}</Text>
            </div>
          ))}
        </div>
      </div>

      <Legend items={severityLabels} />
    </section>
  );
}

function CriteriaChart({ criteriaData }) {
  const maxCriteriaValue = Math.max(1, ...criteriaData.map((criterion) => criterion.value));
  const chartMax = Math.max(10, Math.ceil(maxCriteriaValue / 10) * 10);
  const ticks = Array.from({ length: 11 }, (_, index) => Math.round((chartMax / 10) * index));

  return (
    <section className={styles.chartSection}>
      <Title level={3} className={styles.sectionTitle}>
        Criteres RGAA avec le plus d'occurrences d'echec
      </Title>

      <div className={styles.horizontalChart}>
        {criteriaData.map((criterion) => (
          <div className={styles.horizontalRow} key={criterion.label}>
            <Text className={styles.criteriaLabel}>{criterion.label}</Text>
            <div className={styles.horizontalTrack}>
              <span
                className={`${styles.horizontalBar} ${styles[criterion.severity]}`}
                style={{ width: `${(criterion.value / chartMax) * 100}%` }}
              />
            </div>
          </div>
        ))}

        <div className={styles.xAxis}>
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
      </div>

      <Legend items={severityLabels.slice(0, 2)} />
    </section>
  );
}

function Charts({ audit = {}, tests = [], website = {}, user = {} }) {
  const auditTests = Array.isArray(tests) ? tests : [];
  const summary = getAuditSummary(audit, auditTests);
  const score = Math.max(0, Math.min(100, summary.score || 0));
  const violations = summary.violations || 0;
  const totalCriteria = summary.total || 0;
  const categoryData = buildCategoryData(auditTests);
  const criteriaData = buildCriteriaData(auditTests);
  const hasViolations = violations > 0;
  const statusLabel = hasViolations ? 'Non conforme' : 'Conforme';
  const auditedUrl = audit.url || website.domain || '';
  const userName = user.username || user.firstName || 'Utilisateur';
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <main className={styles.page}>
      <header className={styles.heroTitle}>
        GRAPHIQUE DE SYNTHESE DES ANOMALIES
      </header>

      <div className={styles.content}>
        

        

        <Tabs defaultActiveKey="details" className={styles.tabs}>
          <TabPane tab="Details des anomalies" key="details" />
          <TabPane tab="Voir la synthese" key="summary" />
        </Tabs>

        {categoryData.length > 0 && <CategoryChart categoryData={categoryData} />}
        {criteriaData.length > 0 && <CriteriaChart criteriaData={criteriaData} />}

        <Card className={styles.footerCard} bodyStyle={{ padding: 18 }}>
          <Text strong>© MakeItAccessible - 2026</Text>
        </Card>
      </div>
    </main>
  );
}

export default Charts;
