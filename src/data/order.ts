import { db } from "@/lib/db";

export const getOrderByUserId = async (userId: string) => {
  try {
    const orders = await db.order.findMany({
      where: { userId },
      include: {
        product: true,
      },
    })

    return orders;
  }
  catch (error) {
    return null;
  }
}

export const getAllOrders = async () => {
  try {
    const orders = await db.order.findMany({
      include: {
        product: true,
      },
    });
    return orders;
  }
  catch (error) {
    return null;
  }
}