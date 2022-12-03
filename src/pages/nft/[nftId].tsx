import { useRouter } from "next/router"
import { Button } from "antd"
import styles from "./NFTDetail.module.scss"

const NFTDetail = () => {
  // We're going to get the NFT's address/id from router, then we're going to pull information on it using the address/id
  const router = useRouter()
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
          NFT Address: <span>{router.query.nftId}</span>
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
        <Button type="primary" className={styles.nftBuyButton} size="large">
          Buy
        </Button>
      </div>
    </div>
  )
}

export default NFTDetail
