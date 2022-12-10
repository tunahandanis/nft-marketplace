// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next"
import { /* uploadFileToIPFS, */ uploadFromBuffer } from "pinata"
//import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToIPFS, uploadFromBuffer } from "pinata";
import { createClient } from '@supabase/supabase-js'
type GeneratedImage = {
  imageURL: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneratedImage>
) {
  //const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

  if (req.method === "POST") {
    // Process a POST request
    console.log(req.body)
    // const { data, error } = await supabase.storage.createBucket('avatars')
    const imageResp = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        body: JSON.stringify({
          prompt: req.body,
          n: 1,
          size: "1024x1024",
        }),
        headers: {
          "Content-Type": "application/json",
          // use env variable for this

          Authorization: "Bearer " + process.env.AI_API_KEY,
        },
      }
    )

    const image = await imageResp.json()

    console.log(image)

    const imageData = await fetch(image.data[0].url, (imageResponse) => {
      let data = ""
      console.log("Started downloading image")
      imageResponse.on("data", (chunk) => {
        data += chunk
        console.log(data)
      })

      imageResponse.on("end", () => {
        console.log("response was ====>" + data)
      })
      console.log(data)
    })

    const buffer = await (await imageData.blob()).arrayBuffer()
    // console.log( Buffer.from(await imageData.blob()));
    const resp = Buffer.from(buffer)
    const pinataResponse = await uploadFromBuffer(resp)
    console.log("This image was retrieved" + pinataResponse)

    //   await fetch('https://gateway.pinata.cloud/ipfs/' + pinataResponse.IpfsHash, (imageResponse) => {

    //   console.log("This image was retrieved" +  imageResponse);
    // });

    res.status(200).json({ imageURL: image.data[0].url })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ imageURL: "Get request detected" })
  }
}
