import { Row } from "antd"
import { useEffect, useState } from "react"
import { useAccountContext } from "contexts/accountContext"
import MyNFT from "components/MyNFT/MyNFT"
import { useRouter } from "next/router"

import styles from "./MyNFTs.module.scss"

// eslint-disable-next-line no-unused-vars
const UserNFTs = () => {
  const [nfts, setNfts] = useState<any>()
  const [collections, setCollections] = useState([]) // initial state must not be undefined, it should stay as at least an empty array
  // get account from context and retrieve account nfts
  const [accountState, accountDispatch] = useAccountContext()

  const router = useRouter()

  // You can use the userWalletAddress to pull from database
  const userWalletAddress = router.query.userAddress

  const addCollection = (name: string) => {
    if (collections) {
      setCollections((prev) => [...prev, { name: name, collectionNfts: [] }])
    } else {
      setCollections([{ name: name, collectionNfts: [] }])
    }
  }

  const makeSellOffer = (
    collectionName: string,
    tokenId: string,
    price: string
  ) => {
    const collectionIndex = collections.findIndex(
      (obj) => obj.name === collectionName
    )

    const newCollections = [...collections]
    newCollections[collectionIndex].collectionNfts.push({ tokenId, price })

    setCollections(newCollections)
  }

  const cancelSellOffer = (nftId: string) => {}

  useEffect(() => {
    if (accountState.account) {
      setNfts(accountState.account!.nfts)
    }
  }, [accountState])

  console.log(nfts)
  return (
    <div className={styles.nfts}>
      <h2 className={styles.nftsTitle}>My NFTs</h2>
      <section className={styles.nftsGrid}>
        {nfts && (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {nfts
              .filter((nft) => {
                return !collections.some(
                  (collection) =>
                    collection.collectionNfts.tokenId === nft.NFTokenID
                )
              })
              .map((nft) => (
                <MyNFT
                  nft={nft}
                  key={nft.NFTokenID}
                  collections={collections}
                  addCollection={addCollection}
                  makeSellOffer={makeSellOffer}
                />
              ))}
          </Row>
        )}
      </section>
      <section className={styles.nftsCollection}>
        {collections.map((collection) => {
          return (
            <div key={collection.name} className={styles.nftsCollection}>
              <h3 className={styles.nftsCollectionName}>{collection.name}</h3>

              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                className={styles.nftsCollectionGrid}
              >
                {collection.collectionNfts.map(
                  (collectionNft, index, array) => (
                    <MyNFT
                      nft={nfts.filter(
                        (nft) => nft.NFTokenID === collectionNft.tokenId
                      )}
                      nftInCollection={
                        array.filter((collectionNft) => {
                          return nfts.filter(
                            (nft) => nft.NFTokenID === collectionNft.tokenId
                          )
                        })[0]
                      }
                      key={
                        "On collection NFTokenID: " +
                        collection.collectionNfts.tokenId
                      }
                      isBeingSold
                      cancelSellOffer={cancelSellOffer}
                    />
                  )
                )}
              </Row>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default UserNFTs
