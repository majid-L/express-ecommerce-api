# Express, TypeScript and Prisma ORM project

## Endpoints
| HTTP method(s) | URL
|---|---|
GET | /products
GET | /products/:id
GET, PUT, DELETE | /customers/:id
GET, POST, PUT | /customers/:id/cart
GET, POST | /customers/:id/orders
GET | /customers/:id/orders/:orderId


### Run the Express server in development mode.
```sh
npm run dev
```

### Update database schema 
This command performs 2 actions: syncs the database schema with Prisma schema and regenerates Prisma Client.
```sh
npx prisma migrate dev

# or

prisma db push
```

### Compile and run Mocha test suite
```sh
npm run test
```

### Seed database
```sh
npx prisma db seed
```

### Prisma Studio
```sh
npx prisma studio
```