const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config()

const collectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nft-marketplace.pnsw7zp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.use(cors())
app.use(express.json())

mongoose
  .connect(collectionString)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.error(err))

app.use("/", require("./routes/collectionRoute"))

app.listen(3001, () => {
  console.log("Express server running on 3001")
})
