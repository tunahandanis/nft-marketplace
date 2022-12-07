import { useRouter } from "next/router"
import { message } from "antd"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useAccountContext } from "contexts/accountContext"
import styles from "./Profile.module.scss"

const Profile = () => {
  const [accountState] = useAccountContext()

  const router = useRouter()

  const { account } = accountState

  console.log(account)

  // This checks if the user is authorized
  if (router.query.walletAddress !== accountState.account?.address) return null

  return (
    <div className={styles.profile}>
      <div className={styles.profileCard}>
        <div className={styles.profileInfoField}>
          Wallet Address:{" "}
          <CopyToClipboard
            //@ts-ignore
            text={account?.address}
            onCopy={() => {
              message.open({
                type: "info",
                content: "Copied to clipboard",
              })
            }}
          >
            <span style={{ color: "#40a9ff", cursor: "pointer" }}>
              {account?.address}
            </span>
          </CopyToClipboard>
        </div>
        <div className={styles.profileInfoField}>
          Balance: <span>{account?.balance} XRP</span>
        </div>

        <div className={styles.profileInfoField}>
          Public Key:{" "}
          <CopyToClipboard
            //@ts-ignore
            text={account?.publicKey}
            onCopy={() => {
              message.open({
                type: "info",
                content: "Copied to clipboard",
              })
            }}
          >
            <span style={{ color: "#40a9ff", cursor: "pointer" }}>
              {account?.publicKey?.slice(0, 30) + "..."}
            </span>
          </CopyToClipboard>
        </div>
        <div className={styles.profileInfoField}>
          Private Key:{" "}
          <CopyToClipboard
            //@ts-ignore
            text={account?.privateKey}
            onCopy={() => {
              message.open({
                type: "info",
                content: "Copied to clipboard",
              })
            }}
          >
            <span style={{ color: "#40a9ff", cursor: "pointer" }}>
              {account?.privateKey?.slice(0, 30) + "..."}
            </span>
          </CopyToClipboard>
        </div>
        <div className={styles.profileInfoField}>
          Seed:{" "}
          <CopyToClipboard
            //@ts-ignore
            text={account?.secret}
            onCopy={() => {
              message.open({
                type: "info",
                content: "Copied to clipboard",
              })
            }}
          >
            <span style={{ color: "#40a9ff", cursor: "pointer" }}>
              {account?.secret}
            </span>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  )
}

export default Profile
