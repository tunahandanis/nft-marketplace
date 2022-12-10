import { useState } from "react"
import { Button, notification } from "antd"
import styles from "./NFTDetail.module.scss"
import {
  useAccountContext,
  getSellOffers,
  updateBalance,
  updateNFTs,
} from "contexts/accountContext"
import { SmileOutlined } from "@ant-design/icons"

const xrpl = require("xrpl")

const NFTDetail = () => {
  // We're going to get the NFT's address/id from router, then we're going to pull information on it using the address/id

  const [isLoading, setIsLoading] = useState(false)

  const [accountState, accountDispatch] = useAccountContext()

  const acceptSellOffer = async () => {
    setIsLoading(true)
    const wallet = xrpl.Wallet.fromSeed(accountState.account?.secret)
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()

    const sellOffers = await getSellOffers(
      "00080000A849B0FD754DE67ED9F9DD26B7563C0DAAB439D80000099B00000000"
    )

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
  return (
    <div className={styles.nft}>
      <img
        src="https://images.wallpaperscraft.com/image/single/air_balloon_aerostat_art_128614_1920x1080.jpg"
        alt="nft image"
        className={styles.nftImage}
      />
      <div className={styles.nftInfo}>
        <h2 className={styles.nftName}>NFT Name Here</h2>
        <p className={styles.nftDescription}>
          NFT description will be written here
        </p>
        <p className={styles.nftAddress}>
          NFT Address: <span></span>
        </p>
        <p className={styles.nftOwner}>
          Owner: <span>Walter White</span>
        </p>
        <div className={styles.nftPrice}>
          <span>Price: </span>

          <img
            src="https://changenow.io/images/cached/xrp.png"
            alt="nft price in xrp"
          />
          <span className={styles.nftPriceValue}>13.63</span>
        </div>
        <Button
          onClick={acceptSellOffer}
          type="primary"
          className={styles.nftBuyButton}
          size="large"
          loading={isLoading}
        >
          Buy
        </Button>
      </div>
    </div>
  )
}

export default NFTDetail
