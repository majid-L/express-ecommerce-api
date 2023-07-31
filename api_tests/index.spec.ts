import request from "supertest";
import app from '../index';
import { expect } from "chai";
import authTests from './auth.spec';
import productTests from './product.spec';
import ordersTests from './orders.spec';
import cartTests from './cart.spec';
import customerTests from "./customer.spec";
import reviewsTests from "./reviews.spec";
import reseedDatabase from '../prisma/seed';
import endpointsJson from '../endpoints.json';
import addressTests from "./addresses.spec";
import categoriesAndSuppliersTests from "./categories&suppliers.spec";
import wishlistTests from "./wishlist.spec";

export let cookie: string;
export const setupFunction = async () => {
  await reseedDatabase();
  const authResponse = await request(app)
    .post('/api/login')
    .send({username: 'alexnes', password: 'password'});
  
  cookie = authResponse.headers['set-cookie'];
}

describe('API tests', () => {
  after(async () => {
    await reseedDatabase();
    setTimeout(() => process.exit(), 1000);
  });

  describe('/api', () => {
    it('returns inforamtion about API endpoints', async () => {
      const { body }:
      { body: { 
          info: string, 
          endpoints: { [key: string]: any } 
        } 
      } = await request(app)
        .get('/api')
        .expect(200);
      
      expect(body).to.deep.equal(endpointsJson);
    });
  });
  
  authTests();
  productTests();
  ordersTests();
  cartTests();
  customerTests();
  reviewsTests();
  addressTests();
  categoriesAndSuppliersTests();
  wishlistTests();
});