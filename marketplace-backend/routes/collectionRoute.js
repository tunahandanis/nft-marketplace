const express = require("express")
const router = express.Router()
const Collection = require("../models/collectionModel")

router.route("/createCollection").post((req, res) => {
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
    (error, data) => {
      if (error) {
        console.log(error)
      } else {
        console.log(data)
        res.sendStatus(200)
      }
    }
  )
})

module.exports = router
