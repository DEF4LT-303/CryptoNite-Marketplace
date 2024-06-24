"use client";

import { useCurrentUser } from "@/hooks/currentUser";
import { useCart } from "@/hooks/use-cart";
import axios from "axios";
import { useEffect } from "react";

const Success = () => {
  const { items, clearItems } = useCart();
  const user = useCurrentUser();

  useEffect(() => {
    const placeOrder = async () => {
      try {
        const products = items.map((item) => item.product);
        const quantities = items.map((item) => item.quantity);

        const orderRequests = products.map((product, index) => {
          const quantity = quantities[index];
          return axios.post("/api/order", {
            userId: user && user.id,
            productId: product.id,
            total: product.price * quantity,
            status: "COMPLETED",
          });
        });

        await Promise.all(orderRequests);

        console.log("All orders placed successfully");
      } catch (error) {
        console.error("Error placing order:", error);
      }
    };

    placeOrder().then(() => {
      clearItems();
    });
  }, [items, user, clearItems]);

  return <div>Success</div>;
};

export default Success;
