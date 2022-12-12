/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
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

  const [collections, setCollections] = useState<CollectionType[]>([])
  const [collectionsInUI, setCollectionsInUI] = useState()

  const [bool, setBool] = useState(false)

  const [accountState] = useAccountContext()

  useEffect(() => {
    if (accountState.account) {
      fetchCollections()
      fetchNfts()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountState, bool])

  const fetchCollections = async () => {
    if (accountState.account) {
      const res = await fetch("/api/getCollections")
      const json = await res.json()

      const ownerCollections = json.filter(
        (collection: any) =>
          collection.ownerWalletAddress === accountState?.account?.address
      )

      setCollections(ownerCollections)
      setCollectionsInUI(ownerCollections)
    }
  }

  const addCollection = (name: string) => {
    if (collectionsInUI) {
      //@ts-ignore
      setCollectionsInUI((prev) => [
        ...prev,
        { collectionName: name, nfts: [] },
      ])
    } else {
      setCollectionsInUI([{ collectionName: name, nfts: [] }])
    }
  }

  /*  const addCollectionsToDb = async ( collection: object ) => {
    const addCollectionResponse =  await fetch(`/api/collections?walletAddress=${accountState.account?.address}`, {
    
    })

    console.log(addCollectionResponse)


  } */

  /* const getUserCollection = async (wallet: string) => {
    console.log("===== getting user's collections ==== ")
    const addCollectionResponse = await fetch(
      `/api/collections?walletAddress=${accountState.account?.address}`
    )
    const collections = await addCollectionResponse.json()
    //  setCollections(collections.collections)
    console.log("User's collection", collections.collections)
  } */

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

    axios.post("/api/createCollection", newCollection)
    setBool((prev) => !prev)
  }

  const makeSellOffer = (
    collectionName: string,
    tokenId: string,
    price: string,
    nftName: string,
    imageUrl: string
  ) => {
    /*  const collectionIndex = collections.findIndex(
      (obj) => obj.name === collectionName
    ) */

    /*  const newCollections = [...collections]
    newCollections[collectionIndex].collectionNfts.push({ tokenId, price })

    setCollections(newCollections) */

    insertCollection(collectionName, tokenId, price, nftName, imageUrl)
  }

  // const cancelSellOffer = (nftId: string) => {}

  const fetchNfts = async () => {
    if (accountState.account) {
      const res = await fetch("/api/getNfts")
      const json = await res.json()

      const relevantNfts = json.filter((nft) =>
        accountState.account!.nfts.some((el) =>
          Object.values(el).includes(nft.tokenId)
        )
      )

      const nftToBeOnState = accountState.account!.nfts.map((nft) => {
        return {
          ...nft,
          nftName: relevantNfts.filter(
            (relevantNft) => relevantNft.tokenId === nft.NFTokenID
          )[0]?.nftName,
          imageUrl: relevantNfts.filter(
            (relevantNft) => relevantNft.tokenId === nft.NFTokenID
          )[0]?.imageUrl,
        }
      })

      console.log(nftToBeOnState)

      setNfts(nftToBeOnState)
    }
  }

  return (
    <div className={styles.nfts}>
      <h2 className={styles.nftsTitle}>My NFTs</h2>
      <section className={styles.nftsGrid}>
        {nfts && (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {nfts
              .filter((nft: any) => {
                return !collections.some((collection) =>
                  //@ts-ignore
                  collection.nfts.some(
                    (nftIn) => nftIn?.tokenId === nft.NFTokenID
                  )
                )
              })
              .map((nft: any) => (
                <MyNFT
                  nft={nft}
                  key={nft.NFTokenID}
                  collections={collections}
                  collectionsInUI={collectionsInUI}
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
            <div
              key={collection.collectionName}
              className={styles.nftsCollection}
            >
              <h3 className={styles.nftsCollectionName}>
                {collection.collectionName}
              </h3>

              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                className={styles.nftsCollectionGrid}
              >
                {collection.nfts?.map((collectionNft) => (
                  <MyNFT
                    nft={
                      nfts?.filter(
                        (nft: any) => nft.NFTokenID === collectionNft.tokenId
                      )[0]
                    }
                    collectionsForPrice={collections}
                    key={
                      "On collection NFTokenID: " +
                      //@ts-ignore
                      collection.collectionNfts?.tokenId
                    }
                    isBeingSold
                    // cancelSellOffer={cancelSellOffer}
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
