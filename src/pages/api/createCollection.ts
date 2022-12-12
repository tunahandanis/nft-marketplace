import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../utils/dbConnect"
const Collection = require("../../models/collectionModel")

dbConnect()

type CollectionType = {
  collections: string
}
export default async function handler( req: NextApiRequest,
  res: NextApiResponse<CollectionType>
) {
  const collections = await Collection.find({})
  console.log("Got the collection", collections)
  res.status(200).json(collections)


  const collectionName = req.body.collectionName
  const collectionNfts = req.body.nfts
  const collectionOwnerWalletAddress = req.body.ownerWalletAddress

  const filter = { collectionName: collectionName }

  const options = { upsert: true, new: true, setDefaultsOnInsert: true }

  Collection.findOneAndUpdate(
    filter,
    {
      $set: {
        collectionName: collectionName,
        ownerWalletAddress: collectionOwnerWalletAddress,
      },
      $push: { nfts: collectionNfts },
    },
    options,
    (error: Error, data: object) => {
      if (error) {
        console.log(error)
      } else {
        console.log(data)
        res.status(200)
      }
    }
  )

}
