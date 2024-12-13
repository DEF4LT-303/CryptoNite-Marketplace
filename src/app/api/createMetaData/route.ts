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
    try {
        // Parse the incoming request
        const body = await request.json();
        const {id,walletAddress} = body;

        // Retrieve product details from your database
        const imageData = await getProductById(id) // Replace with your database function
        if (!imageData) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Upload image to IPFS
        const response = await axios.get(imageData.images[0], { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: 'jpeg' });
        const data = new FormData()
        data.append("file", blob, "icon_.jpg");
        data.append("isSync", "true");

        const ipfsImageResponse = await starton.post("/ipfs/file", data, {
            headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
        });

        const imageCID = ipfsImageResponse.data.cid;

        // Create metadata JSON and upload it to IPFS
        const metadata = {
            name: imageData.name,
            description: `${imageData.description} and it was minted for owner ${walletAddress}`,
            image: `eu.starton-ipfs.com/ipfs//${imageCID}`,
        };

        const metadataResponse = await starton.post("/ipfs/json", {
            name: "Minted NFT Metadata",
            content: metadata,
            isSync: true,
        });

        const metadataCID = metadataResponse.data.cid;

        // Return metadata URI and minting price to the frontend
        return NextResponse.json({
            metadataURI: `ipfs://${metadataCID}`,
        });
    } catch (error) {
        console.error("Error processing NFT metadata:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}