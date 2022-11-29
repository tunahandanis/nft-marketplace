import { Card, Row, Col } from "antd";
import styles from "./Collections.module.scss";

const Collections = () => {
  return (
    <div className={styles.collections}>
      <h2 className={styles.collectionsTitle}>NFT Collections</h2>
      <section className={styles.collectionsGrid}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className={styles.collectionsCard}>
              <img
                src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                alt="nft collection image"
              />
              <div className={styles.collectionsCardTextContainer}>
                <p className={styles.collectionsCardTitle}>
                  Sample NFT Collection
                </p>
                <p className={styles.collectionsCardOwner}>
                  Created by{" "}
                  <span className={styles.collectionsCardOwnerName}>Tuna</span>
                </p>
              </div>
            </article>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Collections;
