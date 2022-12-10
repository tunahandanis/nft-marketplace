/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Col, Button, Input, Select, Modal, notification } from "antd"
import { useState } from "react"

import { SmileOutlined, PlusOutlined } from "@ant-design/icons"
import { useAccountContext } from "contexts/accountContext"

import styles from "./MyNFT.module.scss"

const xrpl = require("xrpl")

type MyNFTType = {
  nft: any
  nftInCollection?: {
    price: string
    tokenId: string
  }
  collections?: any
  // eslint-disable-next-line no-unused-vars
  addCollection?: (name: string) => void
  isBeingSold?: boolean
  makeSellOffer?: (
    collectionName: string,
    tokenId: string,
    price: string
  ) => void
  // cancelSellOffer?: (nftId: string) => void
}

// eslint-disable-next-line no-unused-vars
const MyNFT: React.FC<MyNFTType> = ({
  nft,
  nftInCollection,
  collections,
  addCollection,
  isBeingSold,
  makeSellOffer,
  // cancelSellOffer,
}) => {
  const [isCreatingOffer, setIsCreatingOffer] = useState(false)
  const [offer, setOffer] = useState("")
  const [collectionInput, setCollectionInput] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const [accountState, accountDispatch] = useAccountContext()

  const createSellOffer = async (tokenId: string) => {
    setIsLoading(true)

    const wallet = xrpl.Wallet.fromSeed(accountState.account?.secret)
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    console.log("\n\n----------------Create Sell Offer----------------")

    const transactionBlob = {
      TransactionType: "NFTokenCreateOffer",
      Account: wallet.address,
      NFTokenID: tokenId,
      Amount: xrpl.xrpToDrops(offer),
      Flags: 1,
    }

    const tx = await client.submitAndWait(transactionBlob, { wallet })

    setIsLoading(false)

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
      message: "Your sell offer was created successfully",
      placement: "bottomRight",
      btn,
      icon: <SmileOutlined style={{ color: "#86dc3d" }} />,
    })

    if (makeSellOffer && selectedCollection) {
      makeSellOffer(selectedCollection, tokenId, offer)
    }
    client.disconnect()
  }

  const collectionOptions = collections?.map((collection: any) => {
    return { value: collection.name, label: collection.name }
  })

  const hideModal = () => setIsModalVisible(false)
  const showModal = () => setIsModalVisible(true)

  return (
    <Col span={6}>
      <article className={styles.nftsCard}>
        <img
          src="https://w0.peakpx.com/wallpaper/284/26/HD-wallpaper-portrait-display-vertical-artwork-digital-art-space-stars-milky-way-planet-blue.jpg"
          alt="nft collection image"
        />
        <div
          className={`${styles.nftsCardTextContainer} ${
            isCreatingOffer &&
            !isBeingSold &&
            styles.nftsCardSecondTextContainer
          }`}
        >
          <p className={styles.nftsCardTitle}>NFT Name Here</p>
          {isCreatingOffer && !isBeingSold ? (
            <>
              <div className={styles.nftsInputContainer}>
                <Input
                  placeholder="In XRP"
                  onChange={(e) => setOffer(e.target.value)}
                  defaultValue={offer}
                  className={styles.nftsOfferInput}
                />
                <div className={styles.nftsCollectionInputContainer}>
                  <Select
                    placeholder="Select a collection"
                    optionFilterProp="children"
                    options={collectionOptions}
                    className={styles.nftsCollectionSelect}
                    onChange={(value) => setSelectedCollection(value)}
                  />
                  <PlusOutlined
                    style={{
                      color: "#fff",
                      fontSize: "24px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                    onClick={showModal}
                  />
                </div>
              </div>
              <div className={styles.nftsSecondButtonContainer}>
                <Button
                  loading={isLoading}
                  className={styles.nftsCancelButton}
                  onClick={() => {
                    setOffer("")
                    setIsCreatingOffer(false)
                  }}
                >
                  Cancel
                </Button>

                <Button
                  loading={isLoading}
                  className={styles.nftsSellButton}
                  onClick={() => {
                    if (offer && selectedCollection) {
                      createSellOffer(nft.NFTokenID)
                    }
                  }}
                >
                  Create
                </Button>
              </div>
            </>
          ) : !isCreatingOffer && !isBeingSold ? (
            <div className={styles.nftsButtonContainer}>
              <Button
                type="primary"
                className={styles.nftsSellButton}
                onClick={() => setIsCreatingOffer(true)}
              >
                Create Sell Offer
              </Button>

              <Button danger className={styles.nftsBurnButton}>
                Burn
              </Button>
            </div>
          ) : (
            <div
              className={`${styles.nftsButtonContainer} ${styles.nftsCollectionButtonContainer}`}
            >
              <Button
                danger
                className={styles.nftsBurnButton}
                /* onClick={() => {
                  if (cancelSellOffer) {
                    cancelSellOffer(nftInCollection.tokenId)
                  }
                }} */
              >
                Cancel Sell Offer
              </Button>
              <div className={styles.nftsPrice}>
                Price:
                <img
                  src="https://changenow.io/images/cached/xrp.png"
                  alt="nft price in xrp"
                />
                <span>{nftInCollection?.price}</span>
              </div>
            </div>
          )}
        </div>
      </article>
      <Modal
        title="Enter a name for your new NFT collection"
        visible={isModalVisible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <Button
            key="create"
            onClick={() => {
              if (collectionInput.trim() !== "" && addCollection) {
                addCollection(collectionInput)
                setCollectionInput("")
                setIsModalVisible(false)
              }
            }}
          >
            Create
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter collection name"
          onChange={(e) => setCollectionInput(e.target.value)}
          value={collectionInput}
        />
      </Modal>
    </Col>
  )
}

export default MyNFT
