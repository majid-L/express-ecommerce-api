import request from "supertest";
import app from '../index';
import 'dotenv/config';
import { exec } from "child_process";
import type { Product, Customer } from "../types/types";
import { expect } from "chai";
import bcrypt from 'bcrypt';

beforeEach(() => {
  exec("npx prisma db seed");
});

after(async () => {
  setTimeout(() => process.exit(), 1000);
});

describe('api/products', () => {
  it('Returns array of all products.', async () => {
    const { body: { products } }: 
      { body: { products: Product[] } } = await request(app)
      .get('/api/products')
      .expect(200);

    expect(products).to.be.an('array').that.has.lengthOf(25);
    products.forEach(product => {
      expect(product).to.have.all.keys('id', 'name', 'description', 'price', 'stock', 'categoryName', 'supplierName', 'thumbnail');
      expect(product.id).to.be.a('number');
      expect(product.stock).to.be.a('number');
      expect(product.name).to.be.a('string');
      expect(product.description).to.be.a('string');
      expect(product.price).to.be.a('string');
      expect(product.categoryName).to.be.a('string');
      expect(product.supplierName).to.be.a('string');
      expect(product.thumbnail).to.be.a('string');
    });
  });

  it('Accepts page number and limit as query parameters.', async () => {
    const { body: { products } }: 
      { body: { products: Product[] } } = await request(app)
      .get('/api/products?page=2&limit=20')
      .expect(200);
    
    expect(products).to.be.an('array').that.has.lengthOf(20);
    expect(products[0]).to.haveOwnProperty('id').to.eql(21);
    expect(products[19]).to.haveOwnProperty('id').to.eql(40);
  });
});

describe('/login', () => {
  it('Login response contains Set-Cookie header with session id.', async () => {
    type Customer = { 
      name: string,
      username: string,
      email: string
     };

    const { body: { customer } }:
      { body: { customer: Customer } } = await request(app)
      .post('/api/login')
      .send({
        username: "alexnes",
        password: "password"
      })
      .expect(200)
      .expect('Set-Cookie', /connect.sid=.+/);
    
    expect(customer).to.deep.equal({
      name: "Alex Nes",
		  username: "alexnes",
		  email: "alex-nes@nexus.pk"
    });
  });

  it('Incorrect username or password returns 401 response.', async () => {
    await request(app)
      .post('/api/login')
      .send({
        username: "alexnesX",
        password: "password"
      })
      .expect(401);

    await request(app)
      .post('/api/login')
      .send({
        username: "alexnes",
        password: "passwordX"
      })
      .expect(401);
  })
});

describe('/api/signup', () => {
  it('Customer can sign up for a new account.', async () => {
    const { body }: { body: Customer } = await request(app)
      .post('/api/signup')
      .send({
        name: "Kal Varrick",
        email: "kvarrick@taliphus.ga",
        username: 'kvarrick3000',
        password: '89hgfb73jf'
      })
      .expect(201);
    
    expect(body).to.be.an('object').that.has.all.keys('id', 'name', 'username', 'password', 'email', 'joinDate', 'billingAddress', 'shippingAddress', 'avatar');
    expect(body.name).to.equal('Kal Varrick');
    expect(body.username).to.equal('kvarrick3000');
    expect(body.email).to.equal('kvarrick@taliphus.ga');

    const matchedPassword = await bcrypt.compare('89hgfb73jf', body.password);
    expect(matchedPassword).to.be.true;
  });

  it('Rejects attempts to sign up using an existing username or email.', async () => {
    const signupWithExistingUsername = await request(app)
      .post('/api/signup')
      .send({
        name: "Marcus Boone",
        email: "boone@raza.dm",
        username: "alexnes",
        password: "password"
      })
      .expect(400);

    expect(signupWithExistingUsername.body.msg).to.equal('Username/email already in use.');

    const signupWithExistingEmail = await request(app)
      .post('/api/signup')
      .send({
        name: "Marcus Boone",
        email: "alex-nes@nexus.pk",
        username: "marcus_boone433",
        password: "password"
      })
      .expect(400);

    expect(signupWithExistingEmail.body.msg).to.equal('Username/email already in use.');
  });
});

describe.only('/api/logout', () => {
  
});