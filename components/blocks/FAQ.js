import styles from '../../styles/Home.module.css';

import { useState } from 'react';

function FAQ() {

    const [faqIndex, setFaqIndex] = useState(0)

    const faqs = [
        {
            question: "Qu'est-ce que le RGAA 4.1 ?",
            answer: "Le Référentiel Général d'Amélioration de l'Accessibilité (RGAA) est le standard officiel français pour l'accessibilité numérique, publié par la DINUM. Basé sur les WCAG 2.1 du W3C, il comprend 106 critères répartis en 13 thématiques. Il est obligatoire pour les services publics et recommandé pour le secteur privé."
        },
        {
            question: "Les critères sont-ils fiables ?",
            answer: "Nos 106 tests sont directement basés sur le référentiel officiel publié sur accessibilite.numerique.gouv.fr. Chaque critère est référencé par son numéro officiel (ex : 1.1, 3.1) et classé par niveau de conformité (A, AA, AAA)."
        },
        {
            question: "L'extension Chrome est-elle gratuite ?",
            answer: "Oui, vous pouvez réaliser 5 audits par mois gratuitement avec l'extension Chrome. Pour un usage illimité, l'export PDF/CSV et le détail complet des corrections, consultez nos offres Pro et Équipe."
        },
        {
            question: "Quelles données sont collectées ?",
            answer: "Seuls les résultats de l'audit (score, erreurs, URL) sont stockés sur votre compte. Aucune donnée personnelle ni contenu de vos pages n'est collecté ou transmis à des tiers. Vos données restent hébergées en Europe."
        },
        {
            question: "Puis-je monitorer mon site complet ?",
            answer: "Oui, le plan Max permet de monitorer toutes les pages de votre site avec des analyses récurrentes quotidiennes, un score global et des alertes de régression en cas de baisse en dessous d'un seuil configurable."
        },
    ]

    return (

        <section className={styles.sliceFaq}>
            <h2 className={styles.titleWhy}>Questions fréquentes</h2>
            <dl className={styles.faqList}>
                {/* On boucle sur le tableau faqs, i = index de chaque question */}
                {faqs.map((faq, i) => (
                    <div key={i} className={styles.faqItem}>
                        {/* Au clic : si la question est déjà ouverte (faqIndex === i), on ferme (null), sinon on ouvre (i) */}
                        <dt
                            className={styles.faqQuestion}
                            role="button"
                            aria-expanded={faqIndex === i}
                            onClick={() => setFaqIndex(faqIndex === i ? null : i)}
                        >
                            {faq.question}
                        </dt>
                        {/* On affiche la réponse uniquement si cette question est celle sélectionnée */}
                        {faqIndex === i && (
                            <dd className={styles.faqAnswer} aria-label={faq.question}>{faq.answer}</dd>
                        )}
                    </div>
                ))}
            </dl>
        </section>

    );
}

export default FAQ;