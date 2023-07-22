import { faker } from '@faker-js/faker';
import prisma from './prisma';
import { UniqueEnforcer } from 'enforce-unique'
import type { Product, Category, Supplier } from '../types/types';

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
for (let i = 0; i < 20; i++) {
  products.push({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 1, max: 400 })),
    stock: faker.number.int({ min: 10, max: 200 }),
    category: categories[randomIndex(categories.length)].name,
    supplier: suppliers[randomIndex(suppliers.length)].name
  });
}

const main = async () => {
  try {
    await prisma.category.createMany({ data: categories });
    await prisma.supplier.createMany({ data: suppliers });
    await prisma.product.createMany({ data: products });
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();