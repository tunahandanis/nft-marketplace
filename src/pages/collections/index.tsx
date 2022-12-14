import { useState, useEffect } from "react"
import { Row, Col } from "antd"
import Link from "next/link"
import styles from "../../styles/path-styles/Collections.module.scss"
/* 
const getCollections = async () => {
  const collectionsResponse = await fetch("/api/collections/")
  const collections = await collectionsResponse.json()
  console.log("getting collections", collections)
  return collections.data
} */

const Collections = () => {
  const [collections, setCollections] = useState()

  useEffect(() => {
    fetchCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCollections = async () => {
    const res = await fetch("/api/getCollections")
    const json = await res.json()

    setCollections(json)
  }

  console.log(collections)
  return (
    <>
      <div className={styles.collections}>
        <h2 className={styles.collectionsTitle}>NFT Collections</h2>
        <section className={styles.collectionsGrid}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {/*@ts-ignore*/}
            {collections?.map((collection) => {
              const nftsLength = collection.nfts.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (nft: any) => nft?.tokenId !== undefined
              ).length

              console.log(collection.nfts)

              if (nftsLength) {
                return (
                  <Col span={6} key={collection._id}>
                    <Link
                      href={`/collections/${collection._id}`}
                      className={styles.collectionsLink}
                    >
                      <article className={styles.collectionsCard}>
                        <img
                          src={collection.nfts[0].imageUrl}
                          alt="nft collection image"
                        />
                        <div className={styles.collectionsCardTextContainer}>
                          <p className={styles.collectionsCardTitle}>
                            {collection.collectionName}
                          </p>
                          <p className={styles.collectionsCardOwner}>
                            By:{" "}
                            <span
                              className={styles.collectionsCardOwnerAddress}
                            >
                              {collection.ownerWalletAddress.slice(0, 20) +
                                "..."}
                            </span>
                          </p>
                        </div>
                      </article>
                    </Link>
                  </Col>
                )
                // eslint-disable-next-line no-else-return
              } else return null
            })}
          </Row>
        </section>
      </div>
    </>
  )
}

export default Collections
