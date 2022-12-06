import Link from "next/link"
import { Typography } from "antd"
import styles from "./Hero.module.scss"

const Hero = () => {
  const { Title } = Typography
  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <Title className={styles.heroTitle}>
          Generate, collect and sell extraordinary NFTs
        </Title>
        <p className={styles.heroPara}>
          AiArtNFT is the first-of-a-kind Web 3 app where you can generate NFT
          art with AI and sell them immediately
        </p>
        <div className={styles.heroButtonContainer}>
          <Link href="/collections">
            <button
              className={`${styles.heroButton} ${styles.heroButtonExplore}`}
            >
              Explore
            </button>
          </Link>
          <Link href="/create">
            <button
              className={`${styles.heroButton} ${styles.heroButtonGenerate}`}
            >
              Create
            </button>
          </Link>
        </div>
      </div>
      <img
        src="/assets/hero-image.png"
        alt="hero image"
        className={styles.heroImage}
      />
    </div>
  )
}

export default Hero
