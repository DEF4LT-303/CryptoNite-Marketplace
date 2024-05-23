import { db } from "@/lib/db"

export const getProductById = async (id: string) => {
  try {
    return await db.product.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    console.error(error)
  }
}