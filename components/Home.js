import styles from '../styles/Home.module.css';
import HeroHome from './blocks/HeroHome.js'; 
import SliceWhy from './blocks/SliceWhy.js';
import SliceValorisation from './blocks/SliceValorisation.js';
import SliceModop from './blocks/SliceModop.js';
import Faq from './blocks/Faq.js';

function Home() {

  return (
    <>
      {/* ── Hero ── */}
      <HeroHome />
      {/* ── Valorisation solution ── */}
      <SliceValorisation />
      {/* ── Comment ça marche ── */}
      <SliceModop />
      {/* ── Pourquoi rendre accessible ── */}
      <SliceWhy/>
      {/* ── FAQ ── */}
      <Faq />
    </>
  );
}
 
export default Home;