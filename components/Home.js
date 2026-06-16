import styles from '../styles/Home.module.css';
import HeroHome from './HomeBlocks/HeroHome.js'; 
import SliceWhy from './HomeBlocks/SliceWhy.js';
import SliceValorisation from './HomeBlocks/SliceValorisation.js';
import SliceModop from './HomeBlocks/SliceModop.js';
import Faq from './HomeBlocks/Faq.js';

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