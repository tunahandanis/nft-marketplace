// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next"
// import { getNFTMetadata, uploadFileToIPFS, uploadFromBuffer } from "pinata";

import dbConnect from "../../../utils/dbConnect"
const Collection = require("../../models/collectionModel")

dbConnect()


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const collectionName = req.body.collectionName
    const collectionTokenId = req.body.tokenId
  
    const filter = { collectionName: collectionName }
  
    Collection.updateOne(
      filter,
  
      { $pull: { nfts: { tokenId: collectionTokenId } } },
  
      (error, data) => {
        if (error) {
          console.log(error)
        } else {
          console.log(data)
          res.send(200)
        }
      }
    )

//   res.send({nfts: nfts })
  }



