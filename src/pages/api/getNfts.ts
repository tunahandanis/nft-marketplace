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
   await NFT.find().then((foundNfts) => res.json(foundNfts))

//   res.send({nfts: nfts })
  }

  //    // console.log("supabase connection is => " + supabase)
  // const { walletAddress } = req.query
  // console.log("Wallet address is " , walletAddress)
  //    try {

  //     const { data, error } = await supabase.from('collections').select().eq("wallet_address", walletAddress)
  //     console.log(data)
  //     res.send({data: data})

  //    } catch(e) {
  //     console.log(e)
  //    }

