import styles from '../../styles/MesAudits.module.css';
import { useRouter } from 'next/router';
import { Progress } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListAudits(props) {
  const router = useRouter();

  function getScoreColor(score) {
    if (score === 100) return "#22c55e";
    if (score >= 50) return "#f97316";
    return "#e63946";
  }

  // 1. Grouper les audits par site avec reduce
  // acc = { siteId: { site, audits: [] } }
  const auditsBySite = props.audits.reduce((acc, audit) => {
    const siteId = audit.site?._id;
    // Si l'audit n'a pas de site associé => on ignore et on retourne l'accumulateur tel quel
    if (!siteId) return acc;

    // Si ce site n'a pas encore de groupe => on l'initialise avec un tableau vide d'audits
    if (!acc[siteId]) {
      acc[siteId] = { site: audit.site, audits: [] };
    }
    // Le groupe existe déjà => on ajoute l'audit dans le tableau existant
    acc[siteId].audits.push(audit);
    return acc;
  }, {});

  // 2. Trie les audits de chaque site du plus récent au plus ancien
  Object.values(auditsBySite).forEach(group => {
    group.audits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  return (
    <main>
      <div className={styles.tableWrapper}>

        {/* En-tête */}
        <div className={styles.gridHeader}>
          <span>Sites</span>
          <span>Score</span>
          <span>Pages auditées</span>
          <span>Date</span>
          <span>Actions</span>
        </div>

        {/* Lignes */}
        {Object.values(auditsBySite).map(({ site, audits }) => {
          const siteSummary = props.siteSummaries.find(s => s.site._id === site._id);
          const siteScore = siteSummary?.summary?.score;
          const siteColor = getScoreColor(siteScore);

          return (
            <div key={site._id}>

              {/* Ligne site */}
              <div className={styles.siteRow}>
                <span>{site.name}</span>
                <div className={styles.circleWrapperSite}>
                  <Progress type="circle" percent={siteScore} strokeColor={siteColor} trailColor="#f1f1f1" size={30} strokeWidth={10}
                    format={(percent) => (
                      <span style={{
                        color: siteColor,
                        fontSize: "1.065rem",
                        fontWeight: 600,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        {percent}
                      </span>
                    )}
                  />
                </div>
                <span className={styles.auditLenght}>{audits.length} audit(s)</span>
                <span className={styles.lastAuditDate}>
                  <span className={styles.lastAuditDate}>
                    {new Date(audits[0].createdAt).toLocaleDateString('fr-FR')}
                    {' - '}
                    {new Date(audits[0].createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </span>

                <div className={styles.actionButtons}>
                  <button title="Voir le détail">
                    <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                  </button>
                  <button title="Télécharger le rapport du site">
                    <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                  </button>
                  <button title="Supprimer le site">
                    <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Lignes audits */}
              {audits.map((audit, index) => {
                const score = audit.summary?.score;
                const color = getScoreColor(score);
                return (
                  <div key={index} className={styles.auditRow}>
                    <span className={styles.auditUrl}>{audit.url}</span>
                    <div className={styles.circleWrapperAudit}>
                      <Progress type="circle" percent={score} strokeColor={color} trailColor="#f1f1f1" size={50} strokeWidth={10}
                        format={(percent) => (
                          <span style={{
                            color: siteColor,
                            fontSize: "1rem",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                            {percent}
                          </span>
                        )}
                      />
                    </div>
                    <span>—</span>
                    <span className={styles.auditDate}>
                      {new Date(audit.createdAt).toLocaleDateString('fr-FR')}
                      {' - '}
                      {new Date(audit.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className={styles.actionButtons}>
                      <button title="Voir le détail">
                        <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                      </button>
                      <button title="Télécharger le rapport de la page">
                        <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                      </button>
                      <button title="Supprimer la page">
                        <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default ListAudits;