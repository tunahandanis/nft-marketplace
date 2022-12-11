import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Row, Col } from "antd"
import Link from "next/link"

import NFTCard from "components/NFTCard"

import styles from "../../styles/path-styles/Collections.module.scss"

type CollectionType = {
  collectionName: string
  ownerWalletAddress: string
  _v: number
  _id: string
  nfts: {
    imageUrl: string
    tokenId: string
    nftName: string
    price: string
    _id: string
  }[]
}

const Collection = () => {
  const router = useRouter()

  const [collection, setCollection] = useState<CollectionType>()

  useEffect(() => {
    fetchCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCollections = async () => {
    const res = await fetch("http://localhost:3001/getCollections")
    const json = await res.json()

    const collectionId = router.query.collectionId

    const filteredCollection = json.filter(
      (collection: CollectionType) => collection._id === collectionId
    )[0]

    setCollection(filteredCollection)
  }

  console.log(collection)

  return (
    <div>
      <h2 className={styles.collectionTitle}>{collection?.collectionName}</h2>
      <section className={styles.collectionGrid}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {collection?.nfts?.map((nft) => {
            if (nft?.tokenId) {
              return (
                <Col span={6} key={nft.tokenId}>
                  <Link
                    href={{
                      pathname: `/nft/${nft.tokenId}`,
                      query: { collectionName: collection.collectionName },
                    }}
                    className={styles.collectionLink}
                  >
                    <NFTCard nft={nft} />
                  </Link>
                </Col>
              )
              // eslint-disable-next-line no-else-return
            } else return null
          })}
        </Row>
      </section>
    </div>
  )
}

export default Collection
