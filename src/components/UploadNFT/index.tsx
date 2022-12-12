/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { UploadOutlined, CheckOutlined } from "@ant-design/icons"
import { Input, Button, notification } from "antd"
import axios from "axios"

import styles from "components/UploadNFT/UploadNFT.module.scss"

import {
  useAccountContext,
  updateNFTs,
  updateBalance,
  getLastMintedNft,
} from "contexts/accountContext"
import { AccountActionTypes } from "reducers/accountReducer"
import { uploadFileToIPFS } from "pinata"

const xrpl = require("xrpl")
type UploadNFTType = {
  // eslint-disable-next-line no-unused-vars
  mintNft: (imageUrl: string, name: string, description: string) => void
  walletAddress?: string
}

const UploadNFT: React.FC<UploadNFTType> = ({ walletAddress }) => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [nameInput, setNameInput] = useState<string>()
  // const [pinataResponse /*  setPinataResponse */] = useState("")
  /* const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVGRDlmRDBkZTI2M2ZBMmY5YTRkMDA5MWNDRUU3YjQ3RTlFMDQwYWQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNzUzOTA3NTgsIm5hbWUiOiJ4cnBfZ2VuZXJhdGl2ZV9haSJ9.yTWTdTEc_OEd6igRJl3JGp0Sd3jueJgxuFd5ieiM3a0"
  ) */
  const [imageBlob, setImageBlob] = useState<any>()
  const [cid /* setCid */] = useState("")
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
      setImageBlob(image)
    }
  }

  const mintNftAndPushToWeb3 = async () => {
    //handleUpload(imageBlob);
    console.log("cid", cid)

    setIsUploading(true)
    await accountState.client.connect((connection: any) => {
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
    accountDispatch({
      type: AccountActionTypes.SET_ACCOUNT_NFTS,
      payload: user_nfts.result.account_nfts,
    })

    const pinataResponse = await uploadFileToIPFS(imageBlob)
    console.log("Pinata Response ", pinataResponse)

    // Mint the NFT and display the IPFS url
    if (pinataResponse?.success) {
      const mintTransactionBlob = {
        TransactionType: "NFTokenMint",
        Account: accountState.wallet?.classicAddress,
        //@ts-ignore
        URI: xrpl.convertStringToHex(pinataResponse?.pinataURL),
        Flags: 8,
        TransferFee: 0,
        NFTokenTaxon: 0, //Required, but if you have no use for it, set to zero.
      }

      const signedTx = await accountState.wallet?.sign(mintTransactionBlob)
      console.log("The transaction was signed " + signedTx + " address => ")
      const tx = await accountState.client.submitAndWait(mintTransactionBlob, {
        wallet: accountState?.wallet,
      })

      // response = await client.request({
      //   command: "account_nfts",
      //   account: address,
      //   ledger_index: "validated",
      // })
      console.table(tx)
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
        message: `Your NFT has been minted`,
        description: "Click to view on explorer:",
        btn,
        placement: "bottomRight",

        duration: 5,
        icon: <CheckOutlined style={{ color: "#108ee9" }} />,
      })
      setIsUploading(false)
      updateNFTs(accountDispatch, accountState.account!.address)
      updateBalance(accountDispatch, accountState.account!.address)

      console.log(tx.result.URI)
      const metaDataHex = tx.result.URI
      const stringMetaDataURI = xrpl.convertHexToString(metaDataHex)
      console.log(stringMetaDataURI)
      const metaDataResponse = await axios.get("api/get_nft_metadata/")

      console.log(metaDataResponse)

      const nftsResponse = await getLastMintedNft(accountState.account!.address)

      const userNfts = nftsResponse.result.account_nfts

      const lastMintedNft = userNfts[userNfts.length - 1]

      insertNft(lastMintedNft.NFTokenID)
    }
  }

  async function insertNft(tokenId: string) {
    const newNft = {
      nftName: nameInput,
      tokenId: tokenId,
    }

    axios.post("/api/createNft", newNft)
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
          </div>
          <Button
            className={`${styles.uploadMintNftButton} ${
              !walletAddress && styles.uploadMintNftButtonDisabled
            }`}
            onClick={() => mintNftAndPushToWeb3()}
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
