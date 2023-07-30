import { faker } from '@faker-js/faker/locale/en_GB';
import { UniqueEnforcer } from 'enforce-unique';

faker.seed(123);

const randomIndex = (range: number): number => {
  return Math.floor(Math.random() * range);
}

const uniqueEnforcer: UniqueEnforcer = new UniqueEnforcer();

const generateCategories = (): Category[] => {
  const categories: Category[] = [];
  for (let i = 0; i < 4; i++) {
    categories.push({
      name: uniqueEnforcer.enforce(() => faker.commerce.department()),
      description: faker.commerce.productAdjective(),
      thumbnail: faker.image.urlLoremFlickr({ category: 'commerce' }) 
    });
  }
  return categories;
}

const generateSuppliers = (): Supplier[] => {
  const suppliers: Supplier[] = [];
  for (let i = 0; i < 4; i++) {
    suppliers.push({
      name: uniqueEnforcer.enforce(() => faker.company.name()),
      location: faker.location.country(),
      establishYear: faker.number.int({ min: 1910, max: new Date().getFullYear() }),
      thumbnail: faker.image.urlLoremFlickr({ category: 'commerce' }) 
    });
  }
  return suppliers;
}

const generateProducts = (categories: Category[], suppliers: Supplier[]) => {
  const products: Product[] = [];
  for (let i = 0; i < 50; i++) {
    const category = categories[randomIndex(categories.length)];
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.finance.amount({ min: 0.50, max: 150.00, dec: 2 })),
      stock: faker.number.int({ min: 10, max: 200 }),
      categoryName: category.name,
      supplierName: suppliers[randomIndex(suppliers.length)].name,
      thumbnail: faker.image.urlLoremFlickr({ category: category.name })
    });
  }

  for (let i = 0; i < 6; i++) {
    products[i].stock = 300
  }

  return products;
}

const generateAddresses = (): Address[] => {
  const addresses: Address[] = [];
  for (let i = 0; i < 12; i++) {
    addresses.push({
      addressLine1: faker.location.streetAddress(),
      addressLine2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      county: faker.location.county(),
      postcode: faker.location.zipCode()
    });
  }

  return addresses;
}

const generateCustomers = (): Customer[] => {
  const customers: Customer[] = [{
    name: "Alex Nes",
    username: "alexnes",
    password: "$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS",
    email: "alex-nes@nexus.pk",
    billingAddressId: 1,
    shippingAddressId: 1
  }];

  for (let i = 0; i < 4; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    customers.push({
      name: firstName + ' ' + lastName,
      username: uniqueEnforcer.enforce(() => faker.internet.userName({ firstName, lastName })),
      password: "$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS",
      email: uniqueEnforcer.enforce(() => faker.internet.email({ firstName, lastName })),
      billingAddressId: i + 2,
      shippingAddressId: i + 2, 
      avatar: faker.image.avatar()
    });
  }

  return customers;
}

const generateCartItems = (customers: Customer[], products: Product[]): CartItem[] => {
  const items: CartItem[] = [];
  for (let i = 0; i < 50; i++) {
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
  //return items.filter(item => item.customerId !== 1);
  return items;
}

const generateOrders = (customers: Customer[]): Order[] => {
  const orders: Order[] = [];
  for (let i = 0; i < 20; i++) {
    const randIndex = randomIndex(customers.length);
    const customer = customers[randIndex];

    orders.push({
      customerId: randIndex ? randIndex + 1 : 2,
      shippingAddressId: customer.shippingAddressId!,
      billingAddressId: customer.billingAddressId!,
      status: 'completed'
    });
  }

  for (let i = 0; i < 2; i++) {
    orders.push({
      customerId: 1,
      shippingAddressId: 1,
      billingAddressId: 1,
      status: 'completed'
    });
  }

  return orders;
}

const generateOrderItems = (orders: Order[], products: Product[]): OrderItem[] => {
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

  return orderItems;
}

const generateReviews = (orders: Order[], orderItems: OrderItem[]) => {
  const reviews: Review[] = [];
  orderItems.forEach(orderItem => {
    reviews.push({
      customerId: orders.find((order, index) => index + 1 === orderItem.orderId)!.customerId,
      productId: orderItem.productId,
      title: faker.company.catchPhrase(),
      body: faker.lorem.paragraph({ min: 1, max: 3 }),
      recommend: faker.datatype.boolean({ probability: 0.6 }),
      rating: faker.number.int({ min: 0, max: 5 }),
      createdAt: faker.date.between({ from: '2016-01-01T00:00:00.000Z', to: Date.now() })
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
  
  return uniqueCustomerReviews;
}

const generateRandomData = () => {
  const categories: Category[] = generateCategories();
  const suppliers: Supplier[] = generateSuppliers();
  const products: Product[] = generateProducts(categories, suppliers);
  const addresses: Address[] = generateAddresses();
  const customers: Customer[] = generateCustomers();
  const cartItems: CartItem[] = generateCartItems(customers, products);
  const orders: Order[] = generateOrders(customers);
  const orderItems: OrderItem[] = generateOrderItems(orders, products);
  const reviews = generateReviews(orders, orderItems);

  return {
    categories,
    suppliers,
    products,
    addresses,
    customers,
    cartItems,
    orders,
    orderItems,
    reviews
  };
}

const developmentData = generateRandomData();

export default developmentData;