import styles from '../../styles/Home.module.css';


function SliceValorisation() {

      return (

    <section className={styles.sliceValorisation}>
        <div>
          <h2>Notre <span className={styles.highlight}>référentiel</span><br/> à portée de main</h2>
          <p>
            La mise en place d'une stratégie d'accessibilité numérique constitue une étape essentielle.
            Notre outil a été spécifiquement conçu en conformité avec le référentiel{' '}
            <a href='https://accessibilite.numerique.gouv.fr/' target="_blank" rel="noopener noreferrer">RGAA 4.1</a> afin d'accompagner efficacement cette démarche.
          </p>
          <button  type="button" className={styles.btnInfo} onClick={() => window.open('https://accessibilite.numerique.gouv.fr/', '_blank', 'noopener,noreferrer')}>
            Consultez le référentiel RGAA 4.1
          </button>
        </div>
        <div>
          <h2>Votre audit en seulement <span className={styles.highlight}><br/>10 secondes</span></h2>
          <p>
            Consultez et exportez votre rapport d'accessibilité RGAA (PDF) avec une évaluation
            claire et des recommandations concrètes pour rendre votre site web plus inclusif et convivial.
          </p>
        </div>
        <div>
          <h2>Des <span className={styles.highlight}>expert·e·s</span><br/>pour vous accompagner</h2>
          <p>
            Audits experts dans un tableau de bord en temps réel. Anomalies remontées sans délai.
            Progression visible sur chaque site, chaque jour.
            L'accessibilité s'intègre dans les mœurs de vos équipes.
         </p>
        </div>
      </section>

      );
}
 
export default SliceValorisation;