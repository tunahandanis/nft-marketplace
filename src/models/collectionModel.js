const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema({
  ownerWalletAddress: String,
  collectionName: String,
  nfts: [{ tokenId: String, price: String, nftName: String, imageUrl: String }],
})

module.exports =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema)
  