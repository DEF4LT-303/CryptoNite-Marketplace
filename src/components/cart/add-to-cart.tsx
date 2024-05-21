"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      className="w-full"
      variant="default"
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
    >
      {isSuccess ? "Added to cart" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
