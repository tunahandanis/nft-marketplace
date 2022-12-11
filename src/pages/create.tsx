import { useState } from "react"
import UploadNFT from "components/UploadNFT"
import GenerateNFT from "components/GenerateNFT"
import { useAccountContext } from "contexts/accountContext"
import styles from "../styles/path-styles/Create.module.scss"

const Create = () => {
  const [selected, setSelected] = useState<string>("Generate")
  const [accountState] = useAccountContext()

  const mintNft = (imageUrl: string, name: string, description: string) => {
    /* Minting can be done here */
    console.log(imageUrl)
    console.log(name)
    console.log(description)

    // Wallet address can be accessed like this
    console.log(accountState.account?.address)
  }

  return (
    <div className={styles.create}>
      <div className={styles.createTypeButtonContainer}>
        <button
          onClick={() => setSelected("Generate")}
          className={`${styles.createTypeButton} ${
            styles.createTypeButtonGenerate
          } ${selected === "Generate" && styles.createTypeButtonSelected}`}
        >
          Generate
        </button>
        <button
          onClick={() => setSelected("Upload")}
          className={`${styles.createTypeButton} ${
            styles.createTypeButtonUpload
          } ${selected === "Upload" && styles.createTypeButtonSelected}`}
        >
          Upload
        </button>
      </div>
      {selected === "Upload" ? (
        <UploadNFT
          mintNft={mintNft}
          walletAddress={accountState.account?.address}
        />
      ) : (
        <GenerateNFT
          mintNft={mintNft}
          walletAddress={accountState.account?.address}
        />
      )}
    </div>
  )
}

export default Create
