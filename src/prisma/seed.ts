import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    "id": "60c9b4744a2d2b0015b3b9d2",
    "name": "UI Icon Pack",
    "description": "A collection of 120+ icons for your UI projects.",
    "price": 69.99,
    "stock": 1,
    "images": ["https://unblast.com/wp-content/uploads/2019/06/120-UI-Pack-Icons-3.jpg"]
  },
  {
    "id": "60c9b4744a2d2b0015b3b9d3",
    "name": "UI Icon Pack (Dark)",
    "description": "A collection of 120+ dark-themed icons for your UI projects.",
    "price": 69.99,
    "stock": 1,
    "images": ["https://unblast.com/wp-content/uploads/2019/06/120-UI-Pack-Icons-1.jpg"]
  },
  {
    "id": "60c9b4744a2d2b0015b3b9d4",
    "name": "Frontend Template",
    "description": "A modern and responsive frontend template for your web projects.",
    "price": 149.99,
    "stock": 1,
    "images": ["https://themeforest.img.customer.envatousercontent.com/files/462800713/02_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=5a1b241d2191ecacfabc5b9b4c5720bf"]
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
  },
  {
    "userId": "65fd9c7457c475e79566980d",
    "total": 139.98,
    "productId": "60c9b4744a2d2b0015b3b9d3"
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
