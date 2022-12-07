import { Row } from "antd"
import { useEffect, useState } from "react"
import { useAccountContext } from "contexts/accountContext"
import MyNFT from "components/MyNFT/MyNFT"

import styles from "./MyNFTs.module.scss"

// eslint-disable-next-line no-unused-vars
const UserNFTs = () => {
  const [isCreatingOffer, setIsCreatingOffer] = useState(false)
  const [offer, setOffer] = useState("")
  const [nfts, setNfts] = useState<any>()
  const [collections, setCollections] = useState([]) // initial state must not be undefined, it should stay as at least an empty array
  // get account from context and retrieve account nfts
  const [accountState, accountDispatch] = useAccountContext()

  const addCollection = (name: string) => {
    if (collections) {
      setCollections((prev) => [...prev, { name: name, nftIDs: [] }])
    } else {
      setCollections([{ name: name, nftIDs: [] }])
    }
  }

  const makeSellOffer = (collectionName: string, id: string, price: string) => {
    const collectionIndex = collections.findIndex(
      (obj) => obj.name === collectionName
    )

    const newCollections = [...collections]
    newCollections[collectionIndex].nftIDs.push(id)

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
                console.log(nft)
                return !collections.some((collection) =>
                  collection.nftIDs.includes(nft.NFTokenID)
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
                {collection.nftIDs.map((id) => (
                  <MyNFT
                    nft={nfts.filter((nft) => nft.NFTokenID === id)}
                    key={"On collection NFTokenID: " + collection.nftIDs}
                    isBeingSold
                    cancelSellOffer={cancelSellOffer}
                  />
                ))}
              </Row>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default UserNFTs
