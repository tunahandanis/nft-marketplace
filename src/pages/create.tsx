import { useState } from "react"
import UploadNFT from "components/UploadNFT"
import GenerateNFT from "components/GenerateNFT"
import styles from "../styles/path-styles/Create.module.scss"

const Create = () => {
  const [selected, setSelected] = useState<string>("Upload")

  const mintNft = (imageUrl: string, name: string, description: string) => {
    /* Minting can be done here */
    console.log(imageUrl)
    console.log(name)
    console.log(description)
  }

  return (
    <div className={styles.create}>
      <div className={styles.createTypeButtonContainer}>
        <button
          onClick={() => setSelected("Upload")}
          className={`${styles.createTypeButton} ${
            styles.createTypeButtonUpload
          } ${selected === "Upload" && styles.createTypeButtonSelected}`}
        >
          Upload
        </button>
        <button
          onClick={() => setSelected("Generate")}
          className={`${styles.createTypeButton} ${
            styles.createTypeButtonGenerate
          } ${selected === "Generate" && styles.createTypeButtonSelected}`}
        >
          Generate
        </button>
      </div>
      {selected === "Upload" ? (
        <UploadNFT mintNft={mintNft} />
      ) : (
        <GenerateNFT mintNft={mintNft} />
      )}
    </div>
  )
}

export default Create
