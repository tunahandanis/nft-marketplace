const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema({
  ownerWalletAddress: String,
  collectionName: String,
  nfts: [String],
})

const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection
