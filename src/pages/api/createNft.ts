// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next"
// import { getNFTMetadata, uploadFileToIPFS, uploadFromBuffer } from "pinata";

import dbConnect from "../../../utils/dbConnect"
//const Collection = require("../../models/collectionModel")
const NFT = require("../../models/nftModel")
dbConnect()
type NFTMetadata = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTMetadata>
) {
  //const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  const nftName = req.body.nftName
  const tokenId = req.body.tokenId
  const URI = req.body.URI

  const newNft = new NFT({
    nftName,
    tokenId,
    URI,
  })

  newNft.save()
  res.send(200)

//   res.send({nfts: nfts })
  }



