import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    "id": "60c9b4744a2d2b0015b3b9d2",
    "name": "Smartphone",
    "description": "A powerful smartphone with cutting-edge features.",
    "price": 699.99,
    "image": "https://example.com/smartphone.jpg"
  },
  {
    "id": "60c9b4744a2d2b0015b3b9d3",
    "name": "Laptop",
    "description": "A sleek and powerful laptop for work and entertainment.",
    "price": 1299.99,
    "image": "https://example.com/laptop.jpg"
  },
  {
    "id": "60c9b4744a2d2b0015b3b9d4",
    "name": "Headphones",
    "description": "High-quality wireless headphones for immersive audio experience.",
    "price": 149.99,
    "image": "https://example.com/headphones.jpg"
  }
];

const ORDERS = [
  {
    "userId": "66194ba08d9e4f9af96e02f5",
    "total": 1999.98,
    "productId": "60c9b4744a2d2b0015b3b9d2"
  },
  {
    "userId": "66194ba08d9e4f9af96e02f5",
    "total": 449.97,
    "productId": "60c9b4744a2d2b0015b3b9d4"
  }
];

async function createProducts() {

  for (const product of PRODUCTS) {
    await prisma.product.create({ data: product });
  }

  console.log("Products seeded successfully");
}

async function createOrders() {
  for (const order of ORDERS) {
    const createdOrder = await prisma.order.create({
      data: order
    });
  }
  console.log("Orders seeded successfully");
}

async function deleteProducts() {
  await prisma.product.deleteMany({});

  console.log("Products deleted successfully");
}

async function deleteOrders() {
  await prisma.order.deleteMany({});

  console.log("Orders deleted successfully");
}

async function main() {
  try {
    await deleteOrders();
    await deleteProducts();
    await createProducts();
    await createOrders();
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
