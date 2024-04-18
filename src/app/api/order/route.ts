import { getOrderByUserId } from "@/data/order";
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