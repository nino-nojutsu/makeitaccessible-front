import Image from "next/image";
import { Modal } from "antd";
import styles from "../../styles/Header.module.css";

function LoadingModal({ isVisible }) {
  return (
    <Modal
      open={isVisible}
      footer={null}
      closable={false}
      maskClosable={false}
      centered
      width={400}
      className={styles.loadingModal}
    >
      <div style={{ textAlign: "center" }}>
        <p>Votre site est entre de bonnes mains 🙂</p>
        <p>En cours d'analyse...</p>
        <Image
          src='/images/illustration-recherche.png'
          alt='Analyse du site en cours'
          width={150}
          height={150}
        />
      </div>
    </Modal>
  );
}

export default LoadingModal;