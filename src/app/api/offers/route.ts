import { getOffersbyProductId } from "@/data/offers";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('id');

  if (!productId) {
    return NextResponse.json('Invalid input', { status: 400 });
  }

  const offers = await getOffersbyProductId(productId);

  if (!offers) {
    return NextResponse.json('Offers not found', { status: 404 });
  }
  console.log(offers);
  return NextResponse.json(offers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, productId, price } = body;

  const price_usd = 770 * price;

  const createdBid = await db.offers.create({
    data: {
      userId,
      productId,
      price,
      price_usd
    }
  });

  return NextResponse.json({ message: "Bid placed" })
}