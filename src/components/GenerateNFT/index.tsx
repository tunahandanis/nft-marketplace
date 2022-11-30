import { useState } from "react";
import { Input, Button } from "antd";
import styles from "components/GenerateNFT/GenerateNFT.module.scss";

const { TextArea } = Input;

const GenerateNFT = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageInput, setImageInput] = useState<string>();
  /* const [generateLoading, setGenerateLoading] = useState<boolean>();
  const [mintLoading, setMintLoading] = useState<boolean>(); */

  const generateImage = () => {
    setImageUrl(imageInput);
    setImageInput("");
  };

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
      >
        Generate
      </Button>

      {/*  <div className={styles.generateDisplayImage}>
        {imageUrl && <img src={imageUrl} alt="generateed nft image" />}
      </div> */}
      {imageUrl && (
        <>
          <div className={styles.generateInputContainer}>
            <Input placeholder="NFT Name" />
            <Input placeholder="NFT Description" />
          </div>
          <Button
            type="primary"
            size="large"
            className={styles.generateMintNftButton}
          >
            Mint NFT
          </Button>
        </>
      )}
    </div>
  );
};

export default GenerateNFT;
