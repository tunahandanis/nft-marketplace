import { useState } from "react"
import { Row, Col } from "antd"
import Link from "next/link"
import styles from "../../styles/path-styles/Collections.module.scss"

const getCollections = async () => {
  const collectionsResponse = await fetch("/api/collections/")
  const collections = await collectionsResponse.json()
  console.log("getting collections", collections)
  return collections.data
}
const Collections = () => {
  const [collectionsInState] = useState()

  const collections = getCollections()
  console.log(collections)
  // console.log("Connection =>" + response)
  return (
    <>
      <div className={styles.collections}>
        <h2 className={styles.collectionsTitle}>NFT Collections</h2>
        <section className={styles.collectionsGrid}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {collectionsInState?.map((collection) => (
              <Col span={6} key={collection._id}>
                <Link
                  href={`/collections/${collection._id}`}
                  className={styles.collectionsLink}
                >
                  <article className={styles.collectionsCard}>
                    <img
                      src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                      alt="nft collection image"
                    />
                    <div className={styles.collectionsCardTextContainer}>
                      <p className={styles.collectionsCardTitle}>
                        {collection.collectionName}
                      </p>
                      <p className={styles.collectionsCardOwner}>
                        By:{" "}
                        <span className={styles.collectionsCardOwnerAddress}>
                          {collection.ownerWalletAddress.slice(0, 20) + "..."}
                        </span>
                      </p>
                    </div>
                  </article>
                </Link>
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </>
  )
}

export default Collections
