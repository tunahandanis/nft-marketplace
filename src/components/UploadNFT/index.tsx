import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import styles from "components/UploadNFT/UploadNFT.module.scss";

const UploadNFT = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadImage = (image: Blob) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const uploadedImage = reader.result;
      if (typeof uploadedImage === "string") {
        setImageUrl(uploadedImage);
      }
    });
    reader.readAsDataURL(image);
  };

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
            <Input placeholder="NFT Name" />
            <Input placeholder="NFT Description" />
          </div>
          <button className={styles.uploadMintNftButton}>Mint NFT</button>
        </>
      )}
    </div>
  );
};

export default UploadNFT;
