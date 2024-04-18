import { db } from "@/lib/db";

export const getOrderByUserId = async (userId: string) => {
  try {
    const order = await db.order.findFirst({
      where: { userId },
    })

    return order;
  }
  catch (error) {
    return null;
  }
}

export const getAllOrders = async () => {
  try {
    const orders = await db.order.findMany();
    return orders;
  }
  catch (error) {
    return null;
  }
}