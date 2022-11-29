import Link from "next/link";
import { PageHeader } from "antd";

const Header = () => {
  return (
    <div className="header">
      <PageHeader
        className="page-header"
        ghost={false}
        avatar={{
          src: "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
        }}
        title={
          <Link href="/" className="heading">
            NFT Marketplace
          </Link>
        }
        subTitle="Generate your artwork through AI and get it as NFT"
      />
    </div>
  );
};

export default Header;
