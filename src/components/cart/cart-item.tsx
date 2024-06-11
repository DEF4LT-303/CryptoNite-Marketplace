import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ImageIcon, X } from "lucide-react";

type CartItemProps = {
  product: Product;
  quantity: number;
};

const CartItem = ({ product, quantity }: CartItemProps) => {
  const image = product.images[0];

  const { removeItem } = useCart();
  console.log(product);

  return (
    <div className="space-y-3 py-2">
      <div className="flex justify-between  gap-4">
        <div className="flex items-start space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image === "string" ? (
              <img
                src={image}
                className="absolute object-cover h-16 w-16"
                alt={product.name}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              x {quantity}
            </span>
            <span className="line-clamp-1 text-xs mt-1 text-muted-foreground">
              {formatPrice(product.price * quantity)}
            </span>
          </div>
        </div>

        <div className="flex flex-col font-medium ">
          <div className="text-xs text-muted-foreground">
            <button
              className="flex items-center gap-0.5 mr-2"
              onClick={() => {
                removeItem(product.id);
              }}
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
