import prisma from './prisma';
import * as data from './dev_data';

const main = async () => {
  try {
    await prisma.$queryRaw`TRUNCATE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Supplier" RESTART IDENTITY  CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Customer" RESTART IDENTITY  CASCADE`;

    await prisma.category.createMany({ data: data.categories });
    await prisma.supplier.createMany({ data: data.suppliers });
    await prisma.product.createMany({ data: data.products });
    await prisma.customer.createMany({ data: data.customers });
    await prisma.cartItem.createMany({ data: data.cartItems });
    await prisma.order.createMany({ data: data.orders });
    await prisma.orderItem.createMany({ data: data.orderItems });
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (process.env.NODE_ENV !== 'test') {
  main();
}

export default main;