import request from "supertest";
import app from '../index';
import authTests from './auth.spec';
import productTests from './product.spec';
import ordersTests from './orders.spec';
import cartTests from './cart.spec';
import reseedDatabase from '../prisma/seed';

export let cookie: [string];

describe('API tests', () => {
  beforeEach(async () => {
    await reseedDatabase();
  });

  before(done => {
    request(app)
      .post('/api/login')
      .send({username: 'alexnes', password: 'password'})
      .end(function(err, res) {
        if (err) throw err;
        cookie = res.headers['set-cookie'];
        done();
      });
  });
  
  after(async () => {
    setTimeout(() => process.exit(), 1000);
  });
  
  authTests();
  productTests();
  ordersTests();
  cartTests();
});