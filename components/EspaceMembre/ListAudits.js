import styles from '../../styles/MesAudits.module.css';
import { useRouter } from 'next/router';
import { loadAudit } from '../../reducers/audit.js';
import { useEffect, useState } from 'react';
import { deleteAudit, deleteSite } from '../../reducers/audit.js';
import { useDispatch, useSelector } from 'react-redux';
import { Progress } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListAudits(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { auditView } = router.query; 
  const { siteView } = router.query; 

  const handleAuditView = async (auditId) => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/audit/archive/${user.token}/${auditId}`
    ).then(res => res.json());

    if (data.result) {
      dispatch(loadAudit({
        website: data.results.site,
        results: data.results,
        tests: data.tests,
      }));
      router.push(`/archive/${auditId}`);
    }
  };

  /* const handleSitetView = async (siteId) => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/sites/archive/${user.token}/${siteId}`
    ).then(res => res.json());

    if (data.result) {
      dispatch(loadAudit({
        audit: data.results.audit,
        results: data.results,
        tests: data.tests,
      }));
      router.push(`/archive/${siteId}`);
    }
  };*/


  function getScoreColor(score) {
    if (score === 100) return "#22c55e";
    if (score >= 50) return "#f97316";
    return "#e63946";
  }

  // SUPPRIMER UN AUDIT
  const handleDeleteAudit = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/audit/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    }).then(response => response.json())
      .then(data => {
        // Vide le store si l'audit supprimé est celui actuellement affiché sur /audit
        dispatch(deleteAudit(id));
        // reload la page, l'action ne passe pas réellement par redux
        if (data.result) {
          // Vide le store si l'audit supprimé est celui actuellement affiché sur /audit
          dispatch(deleteAudit(id));
          // call back pour modifier le statut du parent mes audits après suppression
          props.onAuditDeleted(id);
        }
      });
  };

  // 1. Grouper les audits par site 
  // Le tableau va grouper props.audits (la liste de tous tes audits passée en props depuis MesAudits)
  // Règle de groupement = (audit) => audit.site?._id donc "groupe par l'id du site"
  // Avec Object.groupBy, chaque groupe est directement un tableau 
  const auditsGroupBySite = Object.groupBy(props.audits, (audit) => audit.site?._id);

  // 2. Trie les audits de chaque site du plus récent au plus ancien
  Object.values(auditsGroupBySite).forEach(auditsGroup => {
    auditsGroup.sort((audit1, audit2) => new Date(audit2.createdAt) - new Date(audit1.createdAt));
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
        {Object.values(auditsGroupBySite).map((auditsGroup) => {
          const site = auditsGroup[0].site;
          const audits = auditsGroup;

          if (!site) return null;

          const siteSummary = props.siteSummaries.find(s => s.site._id === site._id);
          const siteScore = siteSummary?.summary?.score;
          const siteColor = getScoreColor(siteScore);

          return (
            <div key={site._id}>

              {/* Ligne site */}
              <div className={styles.siteRow}>
                <span>{site.name}</span>
                <div className={styles.circleWrapperSite}>
                  <Progress type="circle" percent={siteScore} strokeColor={siteColor} size={30} strokeWidth={10}
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
                            color: color,
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
                      <button title="Voir le détail" onClick={() => handleAuditView(audit._id)}>
                        <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                      </button>
                      <button title="Télécharger le rapport de la page">
                        <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                      </button>
                      <button title="Supprimer la page" onClick={() => handleDeleteAudit(audit._id)}>
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
};

export default ListAudits;