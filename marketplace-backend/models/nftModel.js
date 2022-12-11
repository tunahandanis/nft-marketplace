const mongoose = require("mongoose")

const nftSchema = mongoose.Schema({
  tokenId: String,
  nftName: String,
})

const NFT = mongoose.model("NFT", nftSchema)

module.exports = NFT
