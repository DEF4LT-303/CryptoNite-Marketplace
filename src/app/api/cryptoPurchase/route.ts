import { getProductById } from "@/data/product";
import { db } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

//fetch the db data, handle the user information

const starton = axios.create({
    baseURL: "https://api.starton.io/v3",
    headers: {
        "x-api-key": "sk_live_7ce7c9ed-a47c-4bc1-b960-4288369be289",
    },
  })

export async function POST(request: Request) {
    console.log("inside");
    const body = await request.json();
    const id = body.id;
    console.log(id);
    
    const imageData = await getProductById(id)
    console.log(imageData);
    
    const response = await axios.get(imageData.images[0], { responseType: 'arraybuffer' });
    // const buffer = fs.readFileSync(`../client/public/images/${imageData.image}`)
    // const blob = new Blob([buffer], { type: "jpeg" });
    const blob = new Blob([response.data], { type: 'jpeg' });
    const data = new FormData()
    data.append("file", blob, "icon_.jpg");
    data.append("isSync", "true");
    
    async function uploadOnIpfs(){
        const ipfsImg = await starton.post("/ipfs/file", data, {
            headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
          })
        // res.send({ status: "ok", data: ipfsImg.data});
        return ipfsImg.data;
    }

    async function uploadMetaData(imgCid){
        const metadataJson = {
            name: `A Wonderful NFT`,
            description: `minted by owner xyz at time this`,
            signature: "sadasdadawdawda",
            image: `ipfs://ipfs/${imgCid}`,
        }
        const ipfsMetadata = await starton.post("/ipfs/json", {
            name: "My NFT metadata Json",
            content: metadataJson,
            isSync: true,
        })
        return ipfsMetadata.data; //returning the ipfs metadata
    }

    async function mintNFT(receiverAddress,metadataCid){
        const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
            functionName: "mint",
            signerWallet: WALLET_IMPORTED_ON_STARTON,
            speed: "low",
            params: [receiverAddress, metadataCid],
        })
        return nft.data;
    }
    const ipfsImgData = await uploadOnIpfs();
    const ipfsMetadata = await uploadMetaData(ipfsImgData.cid)
    const SMART_CONTRACT_NETWORK="ethereum-sepolia"
    const SMART_CONTRACT_ADDRESS="0xb23feaf0a57b6c1dca81bb1205b90072ffeff8e0"
    const WALLET_IMPORTED_ON_STARTON="0x357968bad8BDB159eF4A3f4C899D29ED2C745901";   
    const RECEIVER_ADDRESS = "0x7DC08052a988f2bC75858BD0767F75C95128E080"
    // const nft = await mintNFT(RECEIVER_ADDRESS,ipfsMetadata.cid)
    // console.log(nft);
    // response.status(201).json({
    //     transactionHash:nft.transactionHash,
    //     cid:ipfsImgData.cid
    // })
    return NextResponse.json({
      transactionHash:"done",
      cid:"done"
  })
}