import { useState } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { Input } from "antd"
import styles from "components/UploadNFT/UploadNFT.module.scss"

type UploadNFTType = {
  // eslint-disable-next-line no-unused-vars
  mintNft: (imageUrl: string, name: string, description: string) => void
}

const UploadNFT: React.FC<UploadNFTType> = ({ mintNft }) => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [nameInput, setNameInput] = useState<string>()
  const [descriptionInput, setDescriptionInput] = useState<string>()

  const uploadImage = (image: Blob) => {
    const reader = new FileReader()

    reader.addEventListener("load", () => {
      const uploadedImage = reader.result
      if (typeof uploadedImage === "string") {
        setImageUrl(uploadedImage)
      }
    })
    reader.readAsDataURL(image)
  }

  return (
    <div className={styles.uploadCard}>
      <label htmlFor="input" className={styles.uploadButton}>
        <UploadOutlined className={styles.uploadIcon} />
      </label>
      <input
        id="input"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={(e) => uploadImage(e.target.files![0])}
        style={{ display: "none" }}
      />
      <div className={styles.uploadDisplayImage}>
        {imageUrl && <img src={imageUrl} alt="uploaded nft image" />}
      </div>
      {imageUrl && (
        <>
          <div className={styles.uploadInputContainer}>
            <Input
              placeholder="NFT Name"
              defaultValue={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <Input
              placeholder="NFT Description"
              defaultValue={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <button
            className={styles.uploadMintNftButton}
            onClick={() =>
              mintNft(imageUrl, nameInput as string, descriptionInput as string)
            }
          >
            Mint NFT
          </button>
        </>
      )}
    </div>
  )
}

export default UploadNFT
