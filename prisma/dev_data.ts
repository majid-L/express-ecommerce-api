import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';

faker.seed(123);

const randomIndex = (range: number) => {
  return Math.floor(Math.random() * range);
}

const uniqueEnforcer = new UniqueEnforcer();

const generateRandomData = () => {
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
  for (let i = 0; i < 60; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.finance.amount({ min: 0.50, max: 150.00, dec: 2 })),
      stock: faker.number.int({ min: 10, max: 200 }),
      categoryName: categories[randomIndex(categories.length)].name,
      supplierName: suppliers[randomIndex(suppliers.length)].name,
      thumbnail: faker.image.urlLoremFlickr({ category: 'commerce' })
    });
  }

  for (let i = 0; i < 6; i++) {
    products[i].stock = 300
  }

  const customers: Customer[] = [{
    name: "Alex Nes",
    username: "alexnes",
    password: "$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS",
    email: "alex-nes@nexus.pk"
  }];

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

  const populateCarts = () => {
    const items: CartItem[] = [];
    for (let i = 0; i < 100; i++) {
    // generate a unique customerId-productId combination
      const uniqueIdPair = uniqueEnforcer.enforce(() => {
        return [
          randomIndex(customers.length) + 1,
          randomIndex(products.length) + 1
        ];
      });
      items.push({
        customerId: uniqueIdPair[0],
        productId: uniqueIdPair[1],
        quantity: faker.number.int({ min: 1, max: 7 })
      });
    }
    return items.filter(item => item.customerId !== 1);
  }

  const cartItems: CartItem[] = populateCarts();

  const orders: Order[] = [];
  for (let i = 0; i < 60; i++) {
    const randIndex = randomIndex(customers.length);
    orders.push({
      customerId: randIndex ? randIndex + 1 : 2,
      shippingAddress: customers[randIndex].shippingAddress,
      status: 'completed'
    });
  }

  for (let i = 0; i < 2; i++) {
    orders.push({
      customerId: 1,
      status: 'completed'
    });
  }

  cartItems.push({
    customerId: 1,
    productId: 1,
    quantity: 4
  });

  cartItems.push({
    customerId: 1,
    productId: 2,
    quantity: 4
  });

  cartItems.push({
    customerId: 1,
    productId: 3,
    quantity: 4
  });

  customers.push({
    name: "Ryo Ishida",
    username: "four",
    password: "$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS",
    email: "ry_ishida@zairon.law"
  });

  const orderItems: OrderItem[] = [];
  orders.forEach((order, index) => {
    const uniqueItems = Math.ceil(Math.random() * 6);
    const uniqueEnforcer = new UniqueEnforcer();
    for (let i = 1; i <= uniqueItems; i++) {
      const uniqueProductId = uniqueEnforcer.enforce(() => {
        return randomIndex(products.length) + 1;
      });
      orderItems.push({
        orderId: index + 1,
        productId: uniqueProductId,
        quantity: faker.number.int({ min: 1, max: 7 })
      });
    }
  });


  type Review = {
    customerId: number,
    productId: number,
    title: string,
    body: string,
    recommend: boolean,
    rating: number
  }

  const reviews: Review[] = [];
  orderItems.forEach(orderItem => {
    reviews.push({
      customerId: orders.find((order, index) => index + 1 === orderItem.orderId)!.customerId,
      productId: orderItem.productId,
      title: faker.company.catchPhrase(),
      body: faker.lorem.paragraph({ min: 1, max: 3 }),
      recommend: faker.datatype.boolean({ probability: 0.6 }),
      rating: faker.number.int({ min: 0, max: 5 })
    });
  });

  const uniqueCustomerReviews: Review[] = [];
  reviews
    .map(review => `${review.customerId} ${review.productId}`)
    .forEach((element, index, array) => {
      if (index === array.indexOf(element)) {
        uniqueCustomerReviews.push(reviews[index]);
      }
    });
    
  return {
    categories,
    suppliers,
    products,
    customers,
    cartItems,
    orders,
    orderItems,
    reviews: uniqueCustomerReviews
  };
}

const developmentData = generateRandomData();

export default developmentData;