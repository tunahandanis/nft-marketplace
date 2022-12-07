import { Row } from "antd"
import { useEffect, useState } from "react"
import { useAccountContext } from "contexts/accountContext"
import MyNFT from "components/MyNFT/MyNFT"

import styles from "./MyNFTs.module.scss"

// eslint-disable-next-line no-unused-vars
const UserNFTs: React.FC<MyNFTType> = () => {
  const [isCreatingOffer, setIsCreatingOffer] = useState(false)
  const [offer, setOffer] = useState("")
  const [nfts, setNfts] = useState<any>()
  // get account from context and retrieve account nfts
  const [accountState, accountDispatch] = useAccountContext()

  useEffect(() => {
    if (accountState.account) {
      setNfts(accountState.account!.nfts)
    }
  }, [accountState])

  console.log(nfts)
  return (
    <div className={styles.nfts}>
      <h2 className={styles.nftsTitle}>My NFTs</h2>
      <section className={styles.nftsGrid}>
        {nfts && (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {nfts.map((nft) => (
              // We're going to give the whole NFT instead of id later on
              <MyNFT nft={nft} key={nft.NFTokenID} />
            ))}
          </Row>
        )}
      </section>
    </div>
  )
}

export default UserNFTs
