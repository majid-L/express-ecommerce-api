# Express, TypeScript, [Prisma ORM](https://www.prisma.io/) and OpenAPI project

This project features a **[RESTful CRUD API](https://taliphus.vercel.app/api)** that processes data for an ecommerce application.

## Key product features
- Designed and fully documented using Swagger tools and OpenAPI Specification. 
  - Full **[API contract](./openapi.yaml)** can be found [here](./openapi.yaml).
- Powered by Vercel's serverless functions, including a PSQL database server for managing application data (configured for [session persistence](./auth/session.ts)).
- [Session and cookie-based authentication](./auth/) enabling persistent logins.
- [Middleware functions](./middleware) for data validation and user authentication.
  - In-depth error handling, casting a wide net over potential edge cases and sources of error.
- [Data modelling](./prisma/schema.prisma) and [database migrations](./prisma/migrations/20230728105408_/migration.sql) with Prisma ORM.
- Comprehensive [integration testing](./api_tests/), achieving over **90% test coverage** as reported by Istanbul's *nyc* CLI.
- Programmatic [database reseeding](/prisma/seed.ts) using [dummy data](/prisma/dev_data.ts).

<p float="left">
  <img src="./icons/node.svg" width="60" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./icons/ts.svg" width="60" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./icons/prisma.svg" width="140" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./icons/psql.svg" width="60" /> 
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./icons/mocha.svg" width="60" /> 
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./icons/chai.svg" width="60" />
</p>

---
## Endpoints
For more information on available query parameters and request body requirements, visit the **[API base url](https://taliphus.vercel.app/api)**.

Many of these endpoints require authenticated access, which you can accomplish by first signing up and then logging in.

```js
// 1) Send a POST request to /api/signup
{
  "username": ...,
  "password": ...,
  "email": ... ,
  "name": ...
}

// 2) Send a POST request to /api/login
{
  "username": ... /* your username from step 1) */,
  "password": ... /* your password from step 1) */
}
```

| HTTP method(s) | URL
|---|---|
POST | /api/signup
POST | /api/login
POST | /api/logout
GET | /api/products
GET | /api/products/bestsellers
GET | /api/products/:id
GET | /api/products/:id/reviws
GET, PUT, DELETE | /api/customers/:id
GET, PUT | /api/customers/:id/cart
GET, PUT | /api/customers/:id/wishlist
GET, POST | /api/customers/:id/orders
GET | /api/customers/:id/favorites
GET | /api/customers/:id/orders/:orderId
GET | /api/customers/:id/reviews
POST | /api/customers/:id/addresses
DELETE | /api/customers/:id/addresses/:addressId
GET | /api/categories
GET | /api/suppliers
GET, POST | /api/reviews
GET, PUT, DELETE | /api/reviews/:id

---
## Data model
This is a simplified view of the entity relationships that exist within the database. For a more complete picture, consult the **[schema configuration](/prisma/schema.prisma)** and **[migration](/prisma//migrations/20230728105408_/migration.sql)** files.

<img src="./icons/erd-dark.svg" width="900" /> 

---
## Main project dependencies
| Package | Purpose
|---|---|
Express | Web API framework
Prisma | Node.js & TypeScript ORM
SuperTest | Integration testing
Mocha | Test framework
Chai | Assertion library
Passport.js | Authentication middleware
express-session | Session middleware

---
## Running the project on localhost
> This project requires PSQL to be installed locally.

### Setup instructions
1) Clone and fork the repository and install all dependencies.
2) Create a local empty PSQL database called **ecommerce_db**.
3) Create a **.env** file in the root of the repository with 3 environment variables, ```DATABASE_PRISMA_URL```, ```SESSION_SECRET``` and ```PORT```.
```
DATABASE_PRISMA_URL=postgresql://<USER>:<password>@localhost:5432/ecommerce_db
SESSION_SECRET=sessionsecret
PORT=3000
```
4) For ```DATABASE_PRISMA_URL```, Replace ```<USER>``` with the name of your local database user (e.g. *postgres*) and replace ```<PASSWORD>``` with whatever password you used to set up the local user.

You can now run the scripts below and begin to explore the project.

### Run the Express server in development mode.
```sh
npm run dev

# or

npm run start
```

### Compile and run Mocha test suite
```sh
npm run test
```

### Test coverage report 
```sh
npm run testcov
```

### Update database schema 
This command performs 2 actions: syncs the database schema with Prisma schema and regenerates Prisma Client.
```sh
npx prisma migrate dev

# or

prisma db push
```

### Seed database
```sh
npx prisma db seed
```

### [Prisma Studio](https://www.prisma.io/studio) (browser-based GUI and database visualiser)
```sh
npx prisma studio
```