import { faker } from '@faker-js/faker';
import prisma from './prisma';
import { UniqueEnforcer } from 'enforce-unique';
import type { Product, Category, Supplier, Customer, CartItem } from '../types/types';

const randomIndex = (range: number) => {
  return Math.floor(Math.random() * range);
}

const uniqueEnforcer = new UniqueEnforcer();

const categories: Category[] = [];
for (let i = 0; i < 10; i++) {
  categories.push({
    name: uniqueEnforcer.enforce(() => faker.commerce.department()),
    description: faker.commerce.productAdjective(),
    thumbnail: faker.image.urlLoremFlickr({ category: 'commerce' }) 
  });
}

const suppliers: Supplier[] = [];
for (let i = 0; i < 10; i++) {
    suppliers.push({
    name: uniqueEnforcer.enforce(() => faker.company.name()),
    location: faker.location.country(),
    establishYear: faker.number.int({ min: 1910, max: new Date().getFullYear() }),
    thumbnail: faker.image.urlLoremFlickr({ category: 'commerce' }) 
  });
}

const products: Product[] = [];
for (let i = 0; i < 50; i++) {
  products.push({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({ min: 0.50, max: 300.00, precision: 0.01 }),
    stock: faker.number.int({ min: 10, max: 200 }),
    categoryName: categories[randomIndex(categories.length)].name,
    supplierName: suppliers[randomIndex(suppliers.length)].name,
    thumbnail: faker.image.urlLoremFlickr({ category: 'commerce' })
  });
}

const customers: Customer[] = [];
for (let i = 0; i < 10; i++) {
  const address = faker.location.streetAddress({ useFullAddress: true });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  customers.push({
    name: firstName + ' ' + lastName,
    username: uniqueEnforcer.enforce(() => faker.internet.userName({ firstName, lastName })),
    password: "$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS",
    email: uniqueEnforcer.enforce(() => faker.internet.email({ firstName, lastName })),
    billingAddress: address,
    shippingAddress: address, 
    avatar: faker.image.avatar()
  });
}

const cartItems: CartItem[] = [];
for (let i = 0; i < 100; i++) {
  const uniqueCartItem = uniqueEnforcer.enforce(() => {
    return [
      randomIndex(customers.length),
      randomIndex(products.length)
    ];
  });
  cartItems.push({
    customerId: uniqueCartItem[0] + 1,
    productId: uniqueCartItem[1] + 1,
    quantity: faker.number.int({ min: 1, max: 12 })
  });
}

const main = async () => {
  try {
    await prisma.$queryRaw`TRUNCATE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Supplier" RESTART IDENTITY  CASCADE`;
    await prisma.$queryRaw`TRUNCATE "CartItem" RESTART IDENTITY  CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Product" RESTART IDENTITY  CASCADE`;
    await prisma.$queryRaw`TRUNCATE "Customer" RESTART IDENTITY  CASCADE`;

    await prisma.category.createMany({ data: categories });
    await prisma.supplier.createMany({ data: suppliers });
    await prisma.product.createMany({ data: products });
    await prisma.customer.createMany({ data: customers });
    await prisma.cartItem.createMany({ data: cartItems });
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

export default main;