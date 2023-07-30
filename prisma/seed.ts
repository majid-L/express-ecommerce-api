import prisma from './prisma';
import devData from './dev_data';
import testData from './test_data';

//const data = process.env.NODE_ENV === 'test' || process.argv[2]
 // ? testData 
//  : devData;

const data = devData;

const main = async () => {
  try {
    await prisma.$queryRaw`TRUNCATE "Address" RESTART IDENTITY CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Supplier" RESTART IDENTITY  CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Customer" RESTART IDENTITY  CASCADE`;

    await prisma.category.createMany({ data: data.categories });
    await prisma.supplier.createMany({ data: data.suppliers });
    await prisma.product.createMany({ data: data.products });
    await prisma.address.createMany({ data: data.addresses });
    await prisma.customer.createMany({ data: data.customers });
    await prisma.cartItem.createMany({ data: data.cartItems });
    await prisma.order.createMany({ data: data.orders });
    await prisma.orderItem.createMany({ data: data.orderItems });
    await prisma.review.createMany({ data: data.reviews });
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