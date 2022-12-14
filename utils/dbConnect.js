import mongoose from "mongoose"

const connection = {}

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nft-marketplace.pnsw7zp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

  const db = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
