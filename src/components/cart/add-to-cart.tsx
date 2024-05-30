"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { items, addItem } = useCart();
  const isSuccess = false;

  const isProductInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return (
    <Button
      className=" w-1/2 bg-emerald-600 hover:bg-emerald-500"
      variant="secondary"
      disabled={isProductInCart(product.id)}
      onClick={() => {
        addItem(product);
      }}
    >
      <div className="flex justify-center items-center gap-2">
        <ShoppingCart />
        <p>
          {isProductInCart(product.id)
            ? "Added to cart"
            : isSuccess
            ? "Add to cart"
            : "Add to cart"}
        </p>
      </div>
    </Button>
  );
};

export default AddToCartButton;
