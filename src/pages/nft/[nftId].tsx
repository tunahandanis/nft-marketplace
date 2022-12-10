import { useState } from "react"
import { Button, notification } from "antd"
import styles from "./NFTDetail.module.scss"
import { useAccountContext, getSellOffers } from "contexts/accountContext"
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
      "000800001C86886CE1C49F25DC7DF088CE1C7D49AF777E1416E5DA9C00000001"
    )

    const transactionBlob = {
      TransactionType: "NFTokenAcceptOffer",
      Account: wallet.address,
      NFTokenSellOffer:
        sellOffers && sellOffers[sellOffers?.length - 1].nft_offer_index,
    }

    await client.submitAndWait(transactionBlob, { wallet })

    notification.open({
      message: "You successfully bought the NFT",
      placement: "bottomRight",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    })
    setIsLoading(false)

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
