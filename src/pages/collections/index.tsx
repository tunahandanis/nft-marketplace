import { useEffect, useState } from "react"
import { Row, Col } from "antd"
import Link from "next/link"
import styles from "../../styles/path-styles/Collections.module.scss"

const testIds = [
  42153513, 35125312, 258225567, 26901285, 12570493, 24697043, 98172063,
]

const Collections = () => {
  const [collections, setCollections] = useState()

  useEffect(() => {
    //fetchCollections()
  }, [])

  // const fetchCollections = async () => {
  //   const res = await fetch("http://localhost:3001/getCollections")
  //   const json = await res.json()

  //   setCollections(json)
  // }

  // console.log(collections)

  return (
    <div className={styles.collections}>
      <h2 className={styles.collectionsTitle}>NFT Collections</h2>
      <section className={styles.collectionsGrid}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {testIds.map((id) => (
            <Col span={6} key={id}>
              <Link
                href={`/collections/${id}`}
                className={styles.collectionsLink}
              >
                <article className={styles.collectionsCard}>
                  <img
                    src="https://www.wallpaperflare.com/static/266/348/28/digital-art-pattern-vertical-portrait-display-wallpaper-preview.jpg"
                    alt="nft collection image"
                  />
                  <div className={styles.collectionsCardTextContainer}>
                    <p className={styles.collectionsCardTitle}>
                      Sample NFT Collection
                    </p>
                    <p className={styles.collectionsCardOwner}>{id}</p>
                  </div>
                </article>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  )
}

export default Collections
