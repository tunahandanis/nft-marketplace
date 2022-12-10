
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { getNFTMetadata, uploadFileToIPFS, uploadFromBuffer } from "pinata";
import { createClient } from '@supabase/supabase-js'
type NFTMetadata = {
  data: {};
  
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTMetadata>
) { 


    //const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    const supabase = createClient("https://lqmvvslhcfindyifblyk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxbXZ2c2xoY2ZpbmR5aWZibHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0MjY3ODUsImV4cCI6MTk4NTAwMjc4NX0.ElePLMRZGn4pkHac0ZQj7AfHnGXWGBLaQbs_uyJ9pW0")




  if( req.method === 'POST') {
    console.log("POST METHOD HERE", req.body)

  



 
   try {

    const { data, error } = await supabase
    .from('collections')
    .insert({wallet_address: req.body.wallet_address, collection: req.body.name})
    //const { data, error } = await supabase.from('collections').eq("wallet_address", req.body.wallet_address)
    console.log(error)
    console.log(data)
    res.send({status: "Succesfully added collection"})

   } catch(e) {
    console.log(e)
   }
 

    res.end(200)
  }else {
    const { walletAddress } = req.query
      try {


    const { data, error } = await supabase.from('collections').select().eq("wallet_address", walletAddress)
    console.log(data)
    res.send({collections: data})

   } catch(e) {
    console.log(e)
   }
  }



//    // console.log("supabase connection is => " + supabase)
// const { walletAddress } = req.query
// console.log("Wallet address is " , walletAddress)
//    try {


//     const { data, error } = await supabase.from('collections').select().eq("wallet_address", walletAddress)
//     console.log(data)
//     res.send({data: data})

//    } catch(e) {
//     console.log(e)
//    }
 
  
}
