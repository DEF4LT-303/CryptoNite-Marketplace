"use client";

import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@nextui-org/react";
import { Separator } from "@radix-ui/react-separator";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;
  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );
  const fee = 0;

  return (
    <Sheet>
      <SheetTrigger
        aria-hidden="true"
        className="group -m-2 flex items-center p-2 relative"
      >
        {itemCount > 0 ? (
          <Badge
            color="primary"
            content={itemCount}
            shape="circle"
            className="absolute top-1 -right-0 flex items-center justify-center w-5 h-5 bg-red-400 dark:bg-red-500 text-primary-background text-sm rounded-full shadow-md"
          >
            <ShoppingCart className="h-6 w-6 flex-shrink-0 text-muted-foreground hover:text-secondary-foreground ease-in-out duration-300" />
          </Badge>
        ) : (
          <ShoppingCart className="h-6 w-6 flex-shrink-0 text-muted-foreground hover:text-secondary-foreground ease-in-out duration-300" />
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle> Cart</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product, quantity }) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                  />
                ))}
              </ScrollArea>
            </div>

            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/checkout"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image src="/svgs/cat.svg" fill alt="empty shopping cart hippo" />
            </div>

            <div className="text-xl font-semibold">Your Cart is Empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
