import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const getUserById = async (id: string | undefined) => {
  try {
    return await db.user.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    })

    return account;
  }
  catch (error) {
    return null;
  }
}