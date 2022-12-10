
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { getNFTMetadata, uploadFileToIPFS, uploadFromBuffer } from "pinata";
//import { createClient } from '@supabase/supabase-js'
type NFTMetadata = {
  data: {};
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTMetadata>
) { 
    //const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

   

    const response = await getNFTMetadata("https://gateway.pinata.cloud/ipfs/QmXotS9bET35emmAJptig3oaPktdLYGQY9RDUgtGMCXzkm")
    console.log("getting NFTmeta data", response?.data)

    res.send({data: response?.data})
  
}
