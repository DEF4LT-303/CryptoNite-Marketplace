import { db } from "@/lib/db";

export const getOffersbyProductId = async (productId: string) => {
  try {
    const offers = await db.offers.findMany({
      where: { productId },
      include: { user: true },
      orderBy: { createdAt: "desc" }
    });

    return offers;
  } catch (error) {
    return null;
  }
}