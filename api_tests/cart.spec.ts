import request from "supertest";
import app from '../index';
import { expect } from "chai"
import { cookie } from "./index.spec";

// Initial cart returned by GET /api/customers/1/cart
const initialCart = [
  {
	"customerId": 1,
	"productId": 1,
	"quantity": 4
  },
  {
	"customerId": 1,
	"productId": 2,
	"quantity": 4
  },
  {
	"customerId": 1,
	"productId": 3,
	"quantity": 4
  }
];

// Updated cart sent to PUT /api/customers/1/cart
let requestBody: CartItem[];

const cartTests = () => {
  describe('/api/customers/:customerId/cart', () => {
    beforeEach(() => {
      requestBody = [
        {
          "customerId": 1,
          "productId": 1,
          "quantity": 120
        },
        {
          "customerId": 1,
          "productId": 2,
          "quantity": 1
        },
        {
          "customerId": 1,
          "productId": 4,
          "quantity": 23
        },
        {
          "customerId": 1,
          "productId": 5,
          "quantity": 299
        },
        {
          "customerId": 1,
          "productId": 6,
          "quantity": 23
        }
      ]
    });

    it('Customer can view all cart items.', async () => {
      const { body: cart }: { body: CartItemsResponse } = await request(app)
        .get('/api/customers/1/cart')
        .set('Cookie', cookie)
        .expect(200);

      expect(cart.id).to.equal(1);
      expect(cart.name).to.equal('Alex Nes');
      expect(cart.username).to.equal('alexnes');
      expect(cart.cartItems).to.have.lengthOf(3);
      cart.cartItems.forEach((item, index) => {
        expect(item.quantity).to.equal(4);
        expect(item.product.id).to.equal(index + 1);
        expect(item.product.stock).to.equal(300);
      });
    });

    it('Customer can view cart items in a basic/minimal JSON format.', async () => {
      const { body: cart }: { body: CartItemsResponse } = await request(app)
        .get('/api/customers/1/cart?format=basic')
        .set('Cookie', cookie)
        .expect(200);

      expect(cart).to.deep.equal(initialCart);
    });

    it('Customer can add/remove cart items and modify quantities.', async () => {
      const { body: { updatedCartItems } }: 
        { body: { updatedCartItems : CartItem[] } } = await request(app)
        .put('/api/customers/1/cart')
        .set('Cookie', cookie)
        .send(requestBody)
        .expect(200);

      // updatedCartItems property on the JSON response is the same as the request body
      expect(updatedCartItems).to.deep.equal(requestBody);
    });

    it('Customer can clear the entire cart at once.', async () => {
      const { body: { updatedCartItems } }: 
        { body: { updatedCartItems : CartItem[] } } = await request(app)
        .put('/api/customers/1/cart')
        .set('Cookie', cookie)
        .send([])
        .expect(200);

      expect(updatedCartItems).to.deep.equal([]);
    });

    it('A new customer should have an empty cart.', async () => {
      const loginResponse = await request(app)
        .post('/api/login')
        .send({username: 'four', password: 'password'});
          
      const { body }: { body: CartItemsResponse } = await request(app)
        .get('/api/customers/12/cart')
        .set('Cookie', loginResponse.headers['set-cookie'])
        .expect(200);
  
      expect(body.cartItems).to.have.lengthOf(0);
    });

    it('Returns 400 response if request body contains invalid customer id.', async () => {
      requestBody[0].customerId = 2;
      const errorResponse = await request(app)
        .put('/api/customers/1/cart')
        .set('Cookie', cookie)
        .send(requestBody)
        .expect(400);
      
      expect(errorResponse.body.msg).to.equal('Invalid customer id on cart item.');
    });

    it('Returns 400 response if cart item quantity exceeds product stock.', async () => {
      requestBody[0].quantity = 301;
      const errorResponse = await request(app)
        .put('/api/customers/1/cart')
        .set('Cookie', cookie)
        .send(requestBody)
        .expect(400);
      
      expect(errorResponse.body.msg).to.equal('Insufficient stock.');
    });

    it('Returns 404 response for non-existent customer.', async () => {
      const response = await request(app)
        .get('/api/customers/15/cart')
        .set('Cookie', cookie)
        .expect(404);
       
      expect(response.body.msg).to.equal('Not found.');
    });
  });
}

export default cartTests;