import request from "supertest";
import app from '../index';
import authTests from './auth.spec';
import productTests from './product.spec';
import ordersTests from './orders.spec';
import cartTests from './cart.spec';
import customerTests from "./customer.spec";
import reseedDatabase from '../prisma/seed';

export let cookie: [string];

describe('API tests', () => {
  beforeEach(async () => {
    await reseedDatabase();
    const authResponse = await request(app)
      .post('/api/login')
      .send({username: 'alexnes', password: 'password'});
    
    cookie = authResponse.headers['set-cookie'];
  });

  after(async () => {
    setTimeout(() => process.exit(), 1000);
  });
  
  authTests();
  productTests();
  ordersTests();
  cartTests();
  customerTests();
});