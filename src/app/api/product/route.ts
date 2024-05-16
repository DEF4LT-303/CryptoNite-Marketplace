import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, price, images, stock } = body;

  const validatedFields = ProductSchema.safeParse({ name, description, price, images, stock });

  if (!validatedFields.success) {
    return NextResponse.json({ error: 'Invalid input' });
  }

  try {
    const product = await db.product.create({
      data: {
        name,
        description,
        price,
        images,
        stock,
      },
    });

    return NextResponse.json({ success: "Product created successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function GET() {
  const products = await db.product.findMany();

  return NextResponse.json(products);
}