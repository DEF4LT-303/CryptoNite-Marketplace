"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { items, addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);

  const isProductInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      className="w-full bg-emerald-600 hover:bg-emerald-500"
      variant="secondary"
      disabled={!!isSuccess}
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
    >
      <div className="flex justify-center items-center gap-2">
        <ShoppingCart />
        <p>{isSuccess ? "Added to cart!" : "Add to cart"}</p>
      </div>
    </Button>
  );
};

export default AddToCartButton;
