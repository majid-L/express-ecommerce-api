import request from "supertest";
import app from '../index';
import { expect } from "chai";
import { cookie } from "./index.spec";

const ordersTests = () => {  
  describe('/api/customers/:customerId/orders', () => {
    it('Returns list of customer\'s orders.', async () => {
      const { body: ordersResponse }: 
      { body: OrdersResponse } = await request(app)
        .get('/api/customers/1/orders')
        .set('Cookie', cookie)
        .expect(200);

      expect(ordersResponse).to.have.all.keys(['id', 'name', 'username', 'orders']);
      expect(ordersResponse.orders).to.have.lengthOf(2);
      expect(ordersResponse.orders[0]).to.have.all.keys(['id', 'customerId', 'shippingAddress', 'status', 'createdAt', 'orderItems']);
      expect(ordersResponse.orders[0].orderItems[0]).to.have.all.keys(['quantity', 'product']);
      expect(ordersResponse.orders[0].orderItems[0].product).to.have.all.keys(['id', 'name', 'description', 'price', 'stock', 'categoryName', 'supplierName', 'thumbnail']);
    });

    it('Customer can create a new order composed of all items in the cart.', async () => {
      const { body }: { body: NewOrderResponse } = await request(app)
        .post('/api/customers/1/orders')
        .set('Cookie', cookie)
        .expect(201);
    
      expect(body.id).to.equal(23);
      expect(body.customerId).to.equal(1);
      body.orderItems.forEach((item, index) => {
        expect(item.quantity).to.equal(4);
        expect(item.product.id).to.equal(index + 1);
        expect(item.product.stock).to.equal(296);
      });

      // Cart should be empty immediately after an order is created
      const { body: cartAfterOrder }: 
        { body: CartItemsResponse } = await request(app)
        .get('/api/customers/1/cart')
        .set('Cookie', cookie)
        .expect(200);

      expect(cartAfterOrder.cartItems).to.deep.equal([]);
    });

    it('Attempting to submit an order with an empty cart returns 400 response.', async () => {
      const loginResponse = await request(app)
        .post('/api/login')
        .send({username: 'four', password: 'password'});

      const { body: errorResponse }: ApiErrorResponse = await request(app)
        .post('/api/customers/6/orders')
        .set('Cookie', loginResponse.headers['set-cookie'])
        .expect(400);
    
      expect(errorResponse.msg).to.equal('Unable to place order because cart is empty.');
    });

    it('A new customer should have no orders.', async () => {
      const loginResponse = await request(app)
        .post('/api/login')
        .send({username: 'four', password: 'password'});
        
      const { body }: { body: OrdersResponse } = await request(app)
        .get('/api/customers/6/orders')
        .set('Cookie', loginResponse.headers['set-cookie'])
        .expect(200);

      expect(body.orders).to.have.lengthOf(0);
    });

    it('Returns 404 response for non-existent customer.', async () => {
      const { body: { msg } }: ApiErrorResponse = await request(app)
        .get('/api/customers/15/orders')
        .set('Cookie', cookie)
        .expect(404);
       
      expect(msg).to.equal('Not found.');
    });
  });
}

export default ordersTests;