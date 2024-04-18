import { getAllOrders } from "@/data/order";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await getAllOrders();

  if (!orders) {
    return NextResponse.json({ error: "Orders not found" });
  }

  return NextResponse.json(orders);
}