import request from "supertest";
import app from '../index';
import { expect } from "chai";
import { cookie } from "./index.spec";
import { setupFunction } from "./index.spec";

const requestBody = 	{
  "shippingAddress": {
    "addressLine1": "1 Konopelski Close",
    "city": "Wintheiserhill",
    "postcode": "BQ5 9TU"
  },
  "billingAddress": {
    "addressLine1": "50xd Jazmyne Approach",
    "city": "West Lebsack Cross",
    "postcode": "IUs0 7PF"
  }
};

const ordersTests = () => {  
  describe('/api/customers/:customerId/orders', () => {
    describe('View orders', () => {
      before(setupFunction);

      it('GET returns list of customer\'s orders.', async () => {
        const { body: ordersResponse }: 
        { body: OrdersResponse } = await request(app)
          .get('/api/customers/1/orders')
          .set('Cookie', cookie)
          .expect(200);
  
        expect(ordersResponse).to.have.all.keys(['id', 'name', 'username', 'orders']);
        expect(ordersResponse.orders).to.have.lengthOf(2);
        expect(ordersResponse.orders[0]).to.have.all.keys(['id', 'customerId', 'shippingAddressId', 'billingAddressId', 'status', 'createdAt', 'shippingAddress', 'orderItems']);
        expect(ordersResponse.orders[0].orderItems[0]).to.have.all.keys(['quantity', 'product']);
        expect(ordersResponse.orders[0].orderItems[0].product).to.have.all.keys(['id', 'name', 'description', 'price', 'stock', 'categoryName', 'supplierName', 'thumbnail']);
      });

      it('GET returns 404 response for non-existent customer.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .get('/api/customers/15/orders')
          .set('Cookie', cookie)
          .expect(404);
         
        expect(errorResponse.error.info).to.equal('Not found.');
      });
    });

    describe('Order from cart.', () => {
      beforeEach(setupFunction);

      it('POST customer can create a new order composed of all items in the cart.', async () => {
        const { body }: { body: NewOrderResponse } = await request(app)
          .post('/api/customers/1/orders')
          .send(requestBody)
          .set('Cookie', cookie)
          .expect(201);
      
        expect(body.id).to.equal(23);
        expect(body.customerId).to.equal(1);
        expect(body.billingAddress).to.include(requestBody.billingAddress);
        expect(body.shippingAddress).to.include(requestBody.shippingAddress);
        body.orderItems.forEach((item, index) => {
          expect(item.quantity).to.equal(4);
          expect(item.product.id).to.equal(index + 1);
          expect(item.product.stock).to.equal(296);
        });
  
        // Cart should be empty immediately after an order is created
        const { body:  { cart } }: 
          { body: CartItemsResponse } = await request(app)
          .get('/api/customers/1/cart')
          .set('Cookie', cookie)
          .expect(200);
  
        expect(cart.cartItems).to.deep.equal([]);
      });

      it('POST attempting to submit an order with an empty cart returns 400 response.', async () => {
        const loginResponse = await request(app)
          .post('/api/login')
          .send({username: 'four', password: 'password'});
  
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/6/orders')
          .set('Cookie', loginResponse.headers['set-cookie'])
          .send(requestBody)
          .expect(400);
      
        expect(errorResponse.error.info).to.equal('Unable to place order because cart is empty.');
      });
  
      it('POST order must contain shipping and billing addresses.', async () => {
        const { body: firstErrorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .set('Cookie', cookie)
          .send((({shippingAddress, ...obj}) => obj)(requestBody))
          .expect(400);
      
        expect(firstErrorResponse.error.info).to.equal('Request must include billing and shipping addresses.');
  
        const { body: secondErrorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .set('Cookie', cookie)
          .send((({billingAddress, ...obj}) => obj)(requestBody))
          .expect(400);
      
        expect(secondErrorResponse.error.info).to.equal('Request must include billing and shipping addresses.');
      });

      it('POST addresses must include required properties.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .send({...requestBody, shippingAddress: { 
            addressLine1: "yaya",
            cityX: "This key has been intentionally misspelled.",
            postcode: "XX3 3XX"
          } })
          .set('Cookie', cookie)
          .expect(400);
        
        expect(errorResponse.error.info).to.equal("Each address must contain at least `addressLine1`, `city` and `postcode`.");
      });

      it('POST address property values must be strings.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .send({...requestBody, shippingAddress: { 
            addressLine1: "yaya",
            city: 123,
            postcode: "XX3 3XX"
          } })
          .set('Cookie', cookie)
          .expect(400);
        
        expect(errorResponse.error.info).to.equal("Argument `city`: Invalid value provided. Expected StringFilter or String, provided Int.");
      });

      it('POST a new customer should have no orders.', async () => {
        const loginResponse = await request(app)
          .post('/api/login')
          .send({username: 'four', password: 'password'});
          
        const { body }: { body: OrdersResponse } = await request(app)
          .get('/api/customers/6/orders')
          .set('Cookie', loginResponse.headers['set-cookie'])
          .expect(200);
  
        expect(body.orders).to.have.lengthOf(0);
      });
    });

    describe('Single-item order.', () => {
      before(setupFunction);

      it('POST customer can order an item directly without first adding it to cart.', async () => {
        const { body }: { body: NewOrderResponse } = await request(app)
          .post('/api/customers/1/orders')
          .send({...requestBody, ...{ item: { productId: 9, quantity: 13 } }})
          .set('Cookie', cookie)
          .expect(201);
        
        expect(body.orderItems).to.be.an('array').that.has.length(1);
        expect(body.billingAddress).to.include(requestBody.billingAddress);
        expect(body.shippingAddress).to.include(requestBody.shippingAddress);
        expect(body.orderItems[0].quantity).to.equal(13);
        expect(body.orderItems[0].product.id).to.equal(9);
      });
  
      it('POST single-item order must contain product id and quantity.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .send({...requestBody, ...{ item: { productIdXXX: 9, quantity: 13 } }})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Order item must contain product id.');
      });
  
      it('POST returns 404 response if single-item order contains nonexistent product id.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .send({...requestBody, ...{ item: { productId: 73, quantity: 13 } }})
          .set('Cookie', cookie)
          .expect(404);

        expect(errorResponse.error.info).to.equal('Product id is invalid. Item does not exist.');
      });
  
      it('POST returns 400 response if quantity exceeds available stock.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .send({...requestBody, ...{ item: { productId: 22, quantity: 19 } }})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Insufficient stock.');
      });
    });
  });
}

export default ordersTests;