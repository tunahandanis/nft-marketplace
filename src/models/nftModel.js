const mongoose = require("mongoose")

const nftSchema = mongoose.Schema({
  tokenId: String,
  nftName: String,
  imageUrl: String,
})

const NFT = mongoose.models.NFT || mongoose.model("NFT", nftSchema)

module.exports = NFT
