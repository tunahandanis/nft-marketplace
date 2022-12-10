import styles from "./CollectionCard.module.scss"

type CardType = {
  nft: {
    nftName: string
    // description: string
    price: string
    tokenId: string
    imageUrl: string
    _id: string
  }
}

const NFTCard: React.FC<CardType> = ({ nft }) => {
  return (
    <article className={styles.collectionCard}>
      <img src={nft.imageUrl} alt="nft image" />
      <div className={styles.collectionCardTextContainer}>
        <div className={styles.collectionCardInfo}>
          <p className={styles.collectionCardTitle}>{nft.nftName}</p>
        </div>
        <div className={styles.collectionCardInfoBottom}>
          <p className={styles.collectionCardPrice}>Price:</p>
          <div className={styles.collectionCardPriceValue}>
            <img
              src="https://changenow.io/images/cached/xrp.png"
              alt="xrp logo"
            />{" "}
            <span>{nft.price}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default NFTCard
