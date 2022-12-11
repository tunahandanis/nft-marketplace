import { useState, useEffect } from "react"
import { Button, message, notification } from "antd"
import { SmileOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import CopyToClipboard from "react-copy-to-clipboard"

import {
  useAccountContext,
  getSellOffers,
  updateBalance,
  updateNFTs,
} from "contexts/accountContext"
import styles from "./NFTDetail.module.scss"

const xrpl = require("xrpl")

type NFTType = {
  imageUrl: string
  tokenId: string
  nftName: string
  price: string
  _id: string
}

type CollectionType = {
  collectionName: string
  ownerWalletAddress: string
  _v: number
  _id: string
  nfts: NFTType[]
}

const NFTDetail = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [seller, setSeller] = useState()

  const [nft, setNft] = useState<NFTType>()

  const [accountState, accountDispatch] = useAccountContext()

  useEffect(() => {
    fetchCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCollections = async () => {
    const res = await fetch("http://localhost:3001/getCollections")
    const json = await res.json()

    const collectionName = router.query.collectionName

    const filteredCollection = json.filter(
      (collection: CollectionType) =>
        collection.collectionName === collectionName
    )[0]

    setSeller(filteredCollection.ownerWalletAddress)

    const filteredNft = filteredCollection.nfts.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (nft: any) => nft.tokenId === router.query.nftId
    )[0]

    setNft(filteredNft)
  }

  const acceptSellOffer = async () => {
    setIsLoading(true)
    const wallet = xrpl.Wallet.fromSeed(accountState.account?.secret)
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()

    let sellOffers
    if (nft) {
      sellOffers = await getSellOffers(nft.tokenId)
    }

    const transactionBlob = {
      TransactionType: "NFTokenAcceptOffer",
      Account: wallet.address,
      NFTokenSellOffer:
        sellOffers && sellOffers[sellOffers?.length - 1].nft_offer_index,
    }

    const tx = await client.submitAndWait(transactionBlob, { wallet })

    const btn = (
      <a
        href={"https://blockexplorer.one/xrp/testnet/tx/" + tx.result.hash}
        target="_blank"
        rel="noreferrer"
      >
        <span style={{ color: "#40a9ff", cursor: "pointer" }}>
          {tx.result.hash.slice(0, 30) + "..."}
        </span>
      </a>
    )

    notification.open({
      message: "You successfully bought the NFT",
      placement: "bottomRight",
      btn,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    })
    setIsLoading(false)
    updateNFTs(accountDispatch, accountState.account!.address)
    updateBalance(accountDispatch, accountState.account!.address)

    client.disconnect()
  }
  console.log(router.query.params)

  return (
    <div className={styles.nft}>
      <img src={nft?.imageUrl} alt="nft image" className={styles.nftImage} />
      <div className={styles.nftInfo}>
        <h2 className={styles.nftName}>{nft?.nftName}</h2>
        <p className={styles.nftAddress}>
          <CopyToClipboard
            //@ts-ignore
            text={seller}
            onCopy={() => {
              message.open({
                type: "info",
                content: "Copied to clipboard",
              })
            }}
          >
            <span>
              Seller Address:{" "}
              <span className={styles.nftsSellerAddress}>{seller}</span>
            </span>
          </CopyToClipboard>
        </p>

        <div className={styles.nftPrice}>
          <span>Price: </span>

          <img
            src="https://changenow.io/images/cached/xrp.png"
            alt="nft price in xrp"
          />
          <span className={styles.nftPriceValue}>{nft?.price}</span>
        </div>
        <Button
          onClick={acceptSellOffer}
          type="primary"
          className={`${styles.nftBuyButton} ${
            !accountState.account && styles.nftBuyButtonDisabled
          }`}
          size="large"
          loading={isLoading}
          disabled={!accountState.account}
        >
          Buy
        </Button>
      </div>
    </div>
  )
}

export default NFTDetail
