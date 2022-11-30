// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from '@supabase/supabase-js'
type GeneratedImage = {
  imageURL: string;
};
//    YAKUMWAMBA@NFT$
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneratedImage>
) {
    // use env variables to hide your keys 
    // @ts-ignore
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
   
    //curl https://api.openai.com/v1/images/generations \
//   -H 'Content-Type: application/json' \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \
//   -d '{
//     "prompt": "a white siamese cat",
//     "n": 1,
//     "size": "1024x1024"
//   }'

    if (req.method === 'POST') {
        // Process a POST request
        console.log(req.body);
        const { data, error } = await supabase.storage.createBucket('avatars')


            const imageResp = await fetch('https://api.openai.com/v1/images/generations', {
              
                method: 'POST',
                body: JSON.stringify({
                    prompt: req.body,
                    n: 1,
                    size: '1024x1024'
                }),
                headers: {
                    'Content-Type': 'application/json',
                    // use env variable for this

                    'Authorization': 'Bearer ' + process.env.AI_API_KEY,
                }

            
        
        })

        const image = await imageResp.json();
        

        
        console.log(image);
        // let blob = await fetch(image.data[0].url)
        // let blobData = await blob.blob()
        // let uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // const resp = await supabase.storage
    
        // .from('generative-art')
        // .upload(`public/${uuid}.png`,    blobData)

        // //create a signed url for the image 
        

       // console.log("https://lqmvvslhcfindyifblyk.supabase.co/storage/v1/object/",resp.data?.path);
        res.status(200).json({ imageURL: image.data[0].url });

        //https://lqmvvslhcfindyifblyk.supabase.co/storage/v1/object/public/generative-art/public/y1izesg4z2v6udmpwu4h.png
      } else {
        // Handle any other HTTP method
        res.status(200).json({ imageURL: "Get request detected" });
      }
  
}
