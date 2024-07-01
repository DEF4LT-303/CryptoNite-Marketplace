import { getProductById } from "@/data/product";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { ProductCategory } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, price, images, category, stock } = body;

  const validatedFields = ProductSchema.safeParse({ name, description, price, images, category, stock });

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
        category,
        stock,
      },
    });

    console.log('Product created:', product);

    return NextResponse.json({ success: "Product created successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const category = searchParams.get('category') as ProductCategory | null;

  if (id) {
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' });
    }

    return NextResponse.json(product);
  } else {
    if (category) {
      const products = await db.product.findMany({
        where: {
          category: category,
        },
      });

      return NextResponse.json(products);
    }

    const products = await db.product.findMany();

    return NextResponse.json(products);
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();


  if (!id) {
    return NextResponse.json({ error: 'Invalid input' });
  }

  try {
    await db.product.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: 'Product deleted successfully!' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' });
  }
}
