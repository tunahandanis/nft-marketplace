const express = require("express")
const router = express.Router()
const NFT = require("../../models/nftModel")

router.route("/createNft").post((req, res) => {
  const nftName = req.body.nftName
  const tokenId = req.body.tokenId

  const newNft = new NFT({
    nftName,
    tokenId,
  })

  newNft.save()
  res.sendStatus(200)
})

router.route("/getNfts").get((req, res) => {
  NFT.find().then((foundNfts) => res.json(foundNfts))
})

module.exports = router
