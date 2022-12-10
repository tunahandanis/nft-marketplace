const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema({
  ownerWalletAddress: String,
  collectionName: String,
  nfts: [{ tokenId: String, price: String, nftName: String, imageUrl: String }],
})

const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection
