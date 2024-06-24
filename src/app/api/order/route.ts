import { getOrderByUserId } from "@/data/order";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  // const orders = await getAllOrders();

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const orders = await getOrderByUserId(userId);

  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const { userId, productId, total, status } = body;

  const order = await db.order.create({
    data: {
      userId,
      productId,
      total,
      status,
    },
  });

  return NextResponse.json({ success: `Order created with id: ${order.id}` });
}