import { useState } from "react"
import { Input, Button } from "antd"
import styles from "components/GenerateNFT/GenerateNFT.module.scss"

const { TextArea } = Input

type GenerateNFTType = {
  // eslint-disable-next-line no-unused-vars
  mintNft: (imageUrl: string, name: string, description: string) => void
}

const GenerateNFT: React.FC<GenerateNFTType> = ({ mintNft }) => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageInput, setImageInput] = useState<string>()
  const [isGenerateLoading, setIsGenerateLoading] = useState<boolean>()
  const [nameInput, setNameInput] = useState<string>()
  const [descriptionInput, setDescriptionInput] = useState<string>()
  /* const [isMintLoading, setIsMintLoading] = useState<boolean>(); */

  const handleGenerate = async (promptText: string) => {
    // Stop the form from submitting and refreshing the page.

    // Get data from the form.

    setImageInput(promptText)

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(imageInput)

    // API endpoint where we send form data.
    const endpoint = "/api/generate_art"

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    setImageUrl(result.imageURL)
    console.log("Image has been loaded ...waiting for one more step")
    console.log(`Generative Art prompt text: ${result.imageURL}`)
    setIsGenerateLoading(false)
  }

  const generateImage = async () => {
    setIsGenerateLoading(true)
    setImageUrl("")
    await handleGenerate(imageInput ? imageInput : "No prompt text provided")

    setImageInput("")
  }

  return (
    <div className={styles.generateCard}>
      <TextArea
        rows={4}
        placeholder="Type something for text-to-image AI"
        className={styles.generateTextArea}
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
      />
      <Button
        type="primary"
        size="large"
        className={styles.generateButton}
        onClick={generateImage}
        loading={isGenerateLoading}
      >
        Generate
      </Button>

      <div className={styles.generateDisplayImage}>
        {imageUrl && <img src={imageUrl} alt="generateed nft image" />}
      </div>

      {imageUrl && (
        <>
          <div className={styles.generateInputContainer}>
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
          <Button
            type="primary"
            size="large"
            className={styles.generateMintNftButton}
            onClick={() =>
              mintNft(imageUrl, nameInput as string, descriptionInput as string)
            }
          >
            Mint NFT
          </Button>
        </>
      )}
    </div>
  )
}

export default GenerateNFT
