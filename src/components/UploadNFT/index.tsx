import { useState } from "react"
import { UploadOutlined, CheckOutlined} from "@ant-design/icons"
import { Input, Button,  } from "antd"
import styles from "components/UploadNFT/UploadNFT.module.scss"

import { useAccountContext } from "contexts/accountContext";
import { AccountActionTypes } from "reducers/accountReducer";
import { uploadFileToIPFS } from "pinata";
import { notification, message } from "antd"
import CopyToClipboard from "react-copy-to-clipboard";

const xrpl = require('xrpl')
type UploadNFTType = {
  // eslint-disable-next-line no-unused-vars
  mintNft: (imageUrl: string, name: string, description: string) => void
  walletAddress?: string
}

const UploadNFT: React.FC<UploadNFTType> = ({ mintNft, walletAddress }) => {

const [imageUrl, setImageUrl] = useState<string>()
const [nameInput, setNameInput] = useState<string>()
const [descriptionInput, setDescriptionInput] = useState<string>()
const [pinataResponse, setPinataResponse] = useState("");
const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVGRDlmRDBkZTI2M2ZBMmY5YTRkMDA5MWNDRUU3YjQ3RTlFMDQwYWQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNzUzOTA3NTgsIm5hbWUiOiJ4cnBfZ2VuZXJhdGl2ZV9haSJ9.yTWTdTEc_OEd6igRJl3JGp0Sd3jueJgxuFd5ieiM3a0');
const [imageBlob, setImageBlob] = useState<any>();
const [cid, setCid] = useState('');
const [isUploading, setIsUploading] = useState<boolean>()
// get wallet from accountContext  

const [accountState, accountDispatch] = useAccountContext()


const uploadImage = (image: Blob) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => {
    const uploadedImage = reader.result 
   
    if (typeof uploadedImage === "string") {
      setImageUrl(uploadedImage)
    }
  })

reader.readAsDataURL(image)
  reader.onload = async () => {
  //handleUpload(image);
  setImageBlob(image);
  }
}


const mintNftAndPushToWeb3 = async  () => {
  //handleUpload(imageBlob);
  console.log("cid", cid);
  
setIsUploading(true)
 await accountState.client.connect( (connection: any) => {
  console.log("connected to xrpl", connection)
 })

  
  // dispatch({
  //   type: AccountActionTypes.SET_ACCOUNT_NFTS,
  //   payload: account_nfts
  // });

  const user_nfts = await accountState.client.request({
    command: "account_nfts",
    account: accountState.account?.address,
    ledger_index: "validated",
  })  

  accountDispatch({ type: AccountActionTypes.SET_ACCOUNT_NFTS, payload: user_nfts.result.account_nfts})
  
  const pinataResponse = await uploadFileToIPFS(imageBlob, "nameInput", "descriptionInput")
  console.log("accountState", user_nfts)

  // Mint the NFT and display the IPFS url

  const mintTransactionBlob = {
    "TransactionType": "NFTokenMint",
    "Account": accountState.wallet?.classicAddress,
    "URI": xrpl.convertStringToHex(`https://gateway.pinata.cloud/ipfs/}`),
    "Flags": 8,
    "TransferFee": 0,
    "NFTokenTaxon": 0 //Required, but if you have no use for it, set to zero.
  }
  const signedTx = await accountState.wallet?.sign(mintTransactionBlob)
  console.log("The transaction was signed " + signedTx + " address => " )
   const tx = await accountState.client.submitAndWait(mintTransactionBlob, { wallet: accountState?.wallet } )
  
    // response = await client.request({
    //   command: "account_nfts",
    //   account: address,
    //   ledger_index: "validated",
    // })
    console.table( tx )
    const btn = (
      <CopyToClipboard
        text={"https://blockexplorer.one/xrp/testnet/tx/" + tx.result.hash}
        onCopy={() => {
          message.open({
            type: "info",
            content: "Transaction Hash Copied!",
          })
        }}
      >
        <span style={{ color: "#40a9ff", cursor: "pointer" }}>
          {tx.result.hash}
        </span>
      </CopyToClipboard>
    )
    notification.open({
      message: `You NFT has been Minted`,
      description: "Click to view on explorer ",
      btn,
      placement: "bottomRight",
  
      duration: 0,
      icon: <CheckOutlined style={{ color: "#108ee9" }} />,
    })
    setIsUploading(false)

    // show a notfication 

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
          <Button
            className={`${styles.uploadMintNftButton} ${
              !walletAddress && styles.uploadMintNftButtonDisabled
            }`}
            onClick={() =>
              mintNftAndPushToWeb3()
            }
            disabled={!walletAddress}
            loading={isUploading}
          >
            Mint NFT
          </Button>
        </>
      )}
    </div>
  )
}

export default UploadNFT



