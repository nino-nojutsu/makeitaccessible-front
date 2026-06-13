import styles from "../../styles/Audit.module.css";
import { useSelector } from "react-redux";
import { Progress } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function Score() {
  const auditData = useSelector((state) => state.audit.value);
  const audit = auditData.audit;
  const score = audit.summary.score;

  /* applique la couleur en fonction du style */
  function getScoreColor(score) {
    if (score === 100) return "#22c55e";
    if (score >= 50) return "#f97316";
    return "#e63946";
  }

  /* applique la mention pour le statut en fonction du score */
  function getScoreMention(score) {
    if (score === 100) return "Totalement conforme";
    if (score >= 50) return "Partiellement conforme";
    return "Non conforme";
  }

  const color = getScoreColor(score);
  const mention = getScoreMention(score);

  return (
    <section
      className={styles.scoreSection}
      aria-label="Score global d'accessibilité"
    >
      <div className={styles.circleWrapper}>
        <Progress
          type="circle"
          percent={score}
          strokeColor={color}
          trailColor="#f1f1f1"
          strokeLinecap="round"
          size={180}
          strokeWidth={10}
          aria-label={`Score RGAA : ${score}%`}
          format={(percent) => (
            <span
              aria-hidden="true"
              style={{
                color,
                fontWeight: 600,
                fontSize: "1.8rem",
                margin: "20px",
              }}
            >
              {percent}%
            </span>
          )}
        />
        <p className={styles.scoreLabel}>SCORE GLOBAL</p>
        <div
          className={styles.tooltip}
          aria-label="En savoir plus sur le score"
          type="button"
        >
          <FontAwesomeIcon icon={faCircleInfo} aria-hidden="true" />
          <p className={styles.tooltipText} role="tooltip">
            Le score affiché est un indicateur provisoire de conformité RGAA. Il
            est calculé sur la base des pages auditées jusqu'ici - plus vous
            testez de pages, plus il sera représentatif de la réalité de votre
            site. Il ne constitue pas un résultat officiel et ne peut pas se
            substituer à un audit complet réalisé par un expert. Par ailleurs,
            si des tests sont marqués "à vérifier", le score final pourrait
            évoluer : ces tests nécessitent une vérification manuelle avant
            d'être pris en compte.
          </p>
        </div>
      </div>

      <div className={styles.inner}>
        <div>
          {/*TODO: @nina Intégrer logique de calcul dans le back*/}
          <p
            role="status"
            className={styles.mention}
            style={{ color: getScoreColor(score) }}
          >
            <strong>{mention}</strong>
          </p>
          <p>
            <strong>{audit?.summary.violations} anomalies</strong> sur 106 critères
          </p>
          {/* Le && pour si incomplete est 0, on n'affiche pas le <p> */}
          {audit?.summary?.incomplete > 0 && (
            <p className={styles.mentionIncomplet}>
              Dont {audit?.summary.incomplete} test(s) à vérifier
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Score;
