"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { items, addItem } = useCart();

  const isProductInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return (
    <Button
      className="w-full hover:text-muted-foreground"
      variant="ghost"
      disabled={isProductInCart(product.id)}
      onClick={() => {
        addItem(product);
      }}
    >
      {/* {isSuccess ? "Added to cart" : "Add to cart"} */}
      <ShoppingCart />
    </Button>
  );
};

export default AddToCartButton;
