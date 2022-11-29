import { Typography } from "antd";
import styles from "./Hero.module.scss";

const Hero = () => {
  const { Title } = Typography;
  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <Title className={styles.heroTitle}>
          Generate, collect and sell extraordinary NFTs
        </Title>
        <div className={styles.heroButtonContainer}>
          <button
            className={`${styles.heroButton} ${styles.heroButtonExplore}`}
          >
            Explore
          </button>
          <button
            className={`${styles.heroButton} ${styles.heroButtonGenerate}`}
          >
            Generate
          </button>
        </div>
      </div>
      <img
        src="https://wallpaperaccess.com/full/6152901.jpg"
        alt="hero image"
        className={styles.heroImage}
      />
    </div>
  );
};

export default Hero;