/* eslint-disable @typescript-eslint/no-explicit-any */

import { Row } from "antd"
import axios from "axios"

import { useEffect, useState } from "react"
import { useAccountContext } from "contexts/accountContext"
import MyNFT from "components/MyNFT/MyNFT"

import styles from "./MyNFTs.module.scss"

type CollectionType = {
  name: string
  collectionNfts: {
    tokenId: string
    price: string
  }[]
}

// eslint-disable-next-line no-unused-vars
const UserNFTs = () => {
  const [nfts, setNfts] = useState<any>()
  const [collections, setCollections] = useState<CollectionType[]>([]) // initial state must not be undefined, it should stay as at least an empty array
  // get account from context and retrieve account nfts
  const [accountState] = useAccountContext()

  // You can use the userWalletAddress to pull from database

  const addCollection = (name: string) => {
    if (collections) {
      setCollections((prev) => [...prev, { name: name, collectionNfts: [] }])
    } else {
      setCollections([{ name: name, collectionNfts: [] }])
    }


  }

  const addCollectionsToDb = async ( collection: object ) => {
    const addCollectionResponse =  await fetch(`/api/collections?walletAddress=${accountState.account?.address}`, {
    
    })

    console.log(addCollectionResponse)


  }

  const getUserCollection = async (wallet: string) => {
    console.log("===== getting user's collections ==== ")
    const addCollectionResponse =  await fetch(`/api/collections?walletAddress=${accountState.account?.address}`)
    const collections = await addCollectionResponse.json()
  //  setCollections(collections.collections)
    console.log("User's collection", collections.collections)

  }

  async function insertCollection(
    collectionName: string,
    tokenId: string,
    price: string,
    nftName: string,
    imageUrl: string
  ) {
    const newCollection = {
      collectionName: collectionName,
      nfts: [
        {
          tokenId: tokenId,
          price: price,
          nftName: nftName,
          imageUrl: imageUrl,
        },
      ],
      ownerWalletAddress: accountState.account?.address,
    }

    axios.post("http://localhost:3001/createCollection", newCollection)
  }

  const makeSellOffer = (
    collectionName: string,
    tokenId: string,
    price: string,
    nftName: string,
    imageUrl: string
  ) => {
    const collectionIndex = collections.findIndex(
      (obj) => obj.name === collectionName
    )

    const newCollections = [...collections]
    newCollections[collectionIndex].collectionNfts.push({ tokenId, price })

    setCollections(newCollections)

    insertCollection(collectionName, tokenId, price, nftName, imageUrl)
  }

  // const cancelSellOffer = (nftId: string) => {}

  useEffect(() => {
    if (accountState.account) {
      setNfts(accountState.account!.nfts)
      getUserCollection(accountState.account?.classicAddress)
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
              .filter((nft: any) => {
                return !collections.some(
                  (collection) =>
                    //@ts-ignore
                    collection.collectionNfts.tokenId === nft.NFTokenID
                )
              })
              .map((nft: any) => (
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
                        (nft: any) => nft.NFTokenID === collectionNft.tokenId
                      )}
                      nftInCollection={
                        array.filter((collectionNft) => {
                          return nfts.filter(
                            (nft: any) =>
                              nft.NFTokenID === collectionNft.tokenId
                          )
                        })[0]
                      }
                      key={
                        "On collection NFTokenID: " +
                        //@ts-ignore
                        collection.collectionNfts.tokenId
                      }
                      isBeingSold
                      // cancelSellOffer={cancelSellOffer}
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
