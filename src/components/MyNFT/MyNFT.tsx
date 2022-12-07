import { Col, Button, Input, Select, Modal } from "antd"
import { useState } from "react"
import { PlusOutlined } from "@ant-design/icons"

import styles from "./MyNFT.module.scss"

type MyNFTType = {
  nft: object
  collections?: any
  addCollection?: (name: string) => void
  isBeingSold?: boolean
  makeSellOffer?: (collectionName: string, URI: string, price: string) => void
  cancelSellOffer?: (nftId: string) => void
}

// eslint-disable-next-line no-unused-vars
const MyNFT: React.FC<MyNFTType> = ({
  nft,
  collections,
  addCollection,
  isBeingSold,
  makeSellOffer,
  cancelSellOffer,
}) => {
  const [isCreatingOffer, setIsCreatingOffer] = useState(false)
  const [offer, setOffer] = useState("")
  const [collectionInput, setCollectionInput] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState()

  const collectionOptions = collections?.map((collection) => {
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
                  className={styles.nftsCancelButton}
                  onClick={() => {
                    setOffer("")
                    setIsCreatingOffer(false)
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className={styles.nftsSellButton}
                  onClick={() => {
                    if (offer && selectedCollection && makeSellOffer) {
                      makeSellOffer(selectedCollection, nft.NFTokenID, offer)
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
                onClick={() => {
                  if (cancelSellOffer) {
                    cancelSellOffer(nft.NFTokenID)
                  }
                }}
              >
                Cancel Sell Offer
              </Button>
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
