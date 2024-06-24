"use server";

import { stripe } from "@/lib/stripe";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";

export const BuyProduct = async (products: Product[], quantities: number[]) => {
  const lineItems = await Promise.all(
    products.map(async (product, index) => {
      const productId = product.id;

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      return {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.images[0] ?? ''],
          },
        },
        quantity: quantities[index],
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
};
