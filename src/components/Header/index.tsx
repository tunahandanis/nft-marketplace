import Link from "next/link";
import { PageHeader, Dropdown, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connectWallet, useAccountContext } from "contexts/accountContext";
import styles from "./Header.module.scss";

const Header = () => {
  const [accountState, accountDispatch] = useAccountContext();

  const generateWallet = () => {
    connectWallet(accountDispatch);
  };

  console.log(accountState);

  return (
    <div className={styles.header}>
      <PageHeader
        ghost={false}
        avatar={{
          src: "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
        }}
        title={
          <Link href="/" className={styles.heading}>
            NFT Marketplace
          </Link>
        }
        subTitle="Generate artwork through AI, secure it as NFT"
        extra={
          <>
            <ul className={styles.headerList}>
              <Link href="/collections">
                <li>
                  <Space className={styles.navChild}>Collections</Space>
                </li>
              </Link>
              <li>
                <Space className={styles.navChild}>Stats</Space>
              </li>
              <li>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>Help Center</Menu.Item>
                      <Menu.Item>Docs</Menu.Item>
                    </Menu>
                  }
                  placement="bottom"
                  arrow
                >
                  <Space className={styles.navChild}>Learn</Space>
                </Dropdown>
              </li>
              <li>
                {accountState.account?.classicAddress ? (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>Profile</Menu.Item>
                        <Menu.Item>My Collections</Menu.Item>
                        <Link href="/create">
                          <Menu.Item>Create</Menu.Item>
                        </Link>
                      </Menu>
                    }
                    placement="bottom"
                    arrow
                  >
                    <UserOutlined className={styles.userLogo} />
                  </Dropdown>
                ) : (
                  <button
                    onClick={generateWallet}
                    className={styles.connectWallet}
                  >
                    Connect Wallet
                  </button>
                )}
              </li>
              <li></li>
            </ul>
          </>
        }
      />
    </div>
  );
};

export default Header;
