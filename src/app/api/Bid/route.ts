import { getProductById } from "@/data/product";
import { db } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json();
    const { userId, productId , bidAmount } = body;
    // const product = await getProductById(productId);
    // if (!product) {
    //     return new Response(JSON.stringify({ error: "Product not found" }), {
    //         status: 400,
    //     });
    // }
    console.log(userId);
    console.log(productId);
    console.log(bidAmount);
    
    const newBid = {
        userId,
        bidAmount,
        timestamp: new Date().toISOString(), // Set bid timestamp
        productId, // Use the retrieved product ID
    };

    const updatedProduct = await db.product.update({
        where: { id: productId },
        data: {
            bids: {
                push: newBid
            }
        }
    });
    
    console.log(updatedProduct);
    
    return NextResponse.json({message:"done"})
}

