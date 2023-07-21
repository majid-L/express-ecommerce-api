import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

/*export async function main() {
  await prisma.customer.create({
    data: {
      name: 'Alex',
      username: 'alex98',
      email: 'alex@mail.net',
      password: 'password'
    }
  });

  const customers = await prisma.customer.findMany();
  return customers;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
*/