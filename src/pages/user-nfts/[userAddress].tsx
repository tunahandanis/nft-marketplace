// import { useRouter } from "next/router"
import { Row } from "antd"
import MyNFT from "components/MyNFT/MyNFT"

import styles from "./MyNFTs.module.scss"

const testIds = [
  42153513, 35125312, 258225567, 26901285, 12570493, 24697043, 98172063,
]

const MyNFTs = () => {
  /* We can pull NFTs using wallet address that comes from router.query.userAddress
  const router = useRouter()  */

  return (
    <div className={styles.nfts}>
      <h2 className={styles.nftsTitle}>My NFTs</h2>
      <section className={styles.nftsGrid}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {testIds.map((id) => (
            // We're going to give the whole NFT instead of id later on
            <MyNFT id={id} key={id} />
          ))}
        </Row>
      </section>
    </div>
  )
}

export default MyNFTs
