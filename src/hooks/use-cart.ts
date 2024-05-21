import { Product } from "@prisma/client"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type CartItem = {
  product: Product
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearItems: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id)
        })),

      clearItems: () => set(() => ({ items: [] }))
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
)