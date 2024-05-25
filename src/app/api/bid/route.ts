import { getProductById } from "@/data/product";
import { db } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json();
    const { userId, name, productId, bidAmount } = body;
    // const product = await getProductById(productId);
    // if (!product) {
    //     return new Response(JSON.stringify({ error: "Product not found" }), {
    //         status: 400,
    //     });
    // }

    const newBid = {
        userId,
        name,
        productId, // Use the retrieved product ID
        bidAmount,
        timeStamp: new Date().toISOString(), // Set bid timestamp
    };

    const createdBid = await db.offers.create({
        data:newBid
    });

    console.log(createdBid);

    return NextResponse.json({ message: "done" })
}