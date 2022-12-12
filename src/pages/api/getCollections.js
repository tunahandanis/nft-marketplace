import dbConnect from "../../../utils/dbConnect"
const Collection = require("../../models/collectionModel")

dbConnect()

export default async function handler(req, res) {
  const collections = await Collection.find({})
  res.status(200).json(collections)
}
