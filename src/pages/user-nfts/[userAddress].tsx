import { Col, Button, Input } from "antd"
import { useState } from "react"
import { useAccountContext } from "contexts/accountContext"

import styles from "./MyNFTs.module.scss"

type MyNFTType = {
  id?: number
}

// eslint-disable-next-line no-unused-vars
const MyNFT: React.FC<MyNFTType> = ({ id }) => {
  const [isCreatingOffer, setIsCreatingOffer] = useState(false)
  const [offer, setOffer] = useState("")
  // get account from context and retrieve account nfts
  const [accountState, accountDispatch] = useAccountContext()
  console.log(accountState)

  return (
    <div className={styles.nfts}>
      <h2 className={styles.nftsTitle}>My NFTs</h2>
      <section className={styles.nftsGrid}>
        {/*  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {testIds.map((id) => (
            // We're going to give the whole NFT instead of id later on
            <MyNFT id={id} key={id} />
          ))}
        </Row> */}
      </section>
    </div>
  )
}

export default MyNFT
