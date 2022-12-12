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
}
