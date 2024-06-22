"use server";

import { getProductById } from "@/data/product";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const BuyProduct = async (productId: string[], quantity: number) => {
  const product = await getProductById(productId[0]);

  if (!product) {
    throw new Error("Product not found");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(product?.price * 100),
          product_data: {
            name: product?.name,
            description: product?.description,
            images: [product?.images[0] ?? ''],
          },
        },
        quantity,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
}
