import styles from "./CollectionCard.module.scss"

type CardType = {
  nft: {
    name: string
    description: string
    price: number
    id: number
    imageUrl: string
  }
}

const CollectionCard: React.FC<CardType> = ({ nft }) => {
  return (
    <article className={styles.collectionCard}>
      <img src={nft.imageUrl} alt="nft image" />
      <div className={styles.collectionCardTextContainer}>
        <div className={styles.collectionCardInfo}>
          <p className={styles.collectionCardTitle}>{nft.name}</p>
          <p className={styles.collectionCardPrice}>Price</p>
        </div>
        <div className={styles.collectionCardInfoBottom}>
          <p className={styles.collectionCardDescription}>{nft.description}</p>
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

export default CollectionCard
