import request from "supertest";
import app from '../index';
import { expect } from "chai";
import { cookie, setupFunction } from "./index.spec";
import prisma from "../prisma/prisma";

const customerTests = () => {
  describe('/api/customers/:customerId', () => {
    beforeEach(setupFunction);

    it('Returns customer account information.', async () => {
      const { body: customer }: { body: Customer } = await request(app)
        .get('/api/customers/1')
        .set('Cookie', cookie)
        .expect(200);
     
      expect(customer).to.have.property('joinDate').that.is.a('string');
      expect(customer).to.include({
        "id": 1,
        "name": "Alex Nes",
        "username": "alexnes",
        "password": "**********",
        "email": "alex-nes@nexus.pk",
        "billingAddressId": 7,
        "shippingAddressId": 8,
        "avatar": null
      });
    });

    it('User can update account details.', async () => {
      const requestBody = {
        "name": "alex",
        "email": "alex-nes@hotmail.com",
        "phone": "0984507450745",
        "avatar": "avatar.url.com"
      };
      const { body: customer }: { body: Customer } = await request(app)
        .put('/api/customers/1')
        .set('Cookie', cookie)
        .send(requestBody)
        .expect(200);
    
      expect(customer).to.have.property('joinDate').that.is.a('string');
      expect(customer).to.include({
        ...requestBody,
        id: 1,
        password: "**********"
      });
    });

    it('User can update username and password.', async () => {
      const requestBody = { 
        username: "alex-nes-22",
        password: "new-password-abc-123" 
      };

      await request(app)
        .put('/api/customers/1')
        .send(requestBody)
        .set('Cookie', cookie)
        .expect(200);

      await request(app)
        .post('/api/logout')
        .set('Cookie', cookie)
        .expect(200);
      
      await request(app)
        .post('/api/login')
        .send(requestBody)
        .expect(200)
        .expect('Set-Cookie', /connect.sid=.+/);
    });

    it('User can delete account, triggering a cascade delete of all related data.', async () => {
      const { body: deleteResponse }: { 
        body: { 
          msg: string, 
          deletedUser: { 
            id: number, 
            name: string,
            username: string,
            email: string
          } 
        } 
      } = await request(app)
        .delete('/api/customers/1')
        .set('Cookie', cookie)
        .expect(200);

      expect(deleteResponse).to.deep.equal({
        "msg": "User alexnes has been deleted.",
        "deletedUser": {
          "id": 1,
          "name": "Alex Nes",
          "username": "alexnes",
          "email": "alex-nes@nexus.pk"
        }
      });

      // Check that all data related to this customer has been deleted
      const userData = await Promise.all([
        await prisma.customer.findUnique({
          where: { id: 1 }
        }),
        await prisma.cartItem.findMany({
          where: { customerId: 1 }
        }),
        await prisma.orderItem.findMany({
          where: {
            OR: [
              { orderId: 61 },
              { orderId: 62 }
            ]
          }
        }),
        await prisma.order.findMany({
          where: { customerId: 1 }
        })
      ]);
      
      userData.forEach((queryResultSet, i) => {
        if (i) {
          expect(queryResultSet).to.be.an('array').that.is.empty;
          return;
        }
        expect(queryResultSet).to.be.null;
      });
    });
      
    it('Returns 404 response for non-existent customer.', async () => {
      const { body: errorResponse }: ApiErrorResponse = await request(app)
        .get('/api/customers/13')
        .set('Cookie', cookie)
        .expect(404);
      
      expect(errorResponse.error.info).to.equal('Not found.');
    });

    it('Returns 400 response in the case of empty or blank fields.', async () => {
      const { body: errorResponse }: ApiErrorResponse = await request(app)
        .put('/api/customers/1')
        .send({ username: '', email: ' ' })
        .set('Cookie', cookie)
        .expect(400);

      expect(errorResponse.error).to.include({ info: 'Field(s) cannot be empty or blank.' });
    });

    it('Returns 400 response in the case of invalid request body structure.', async () => {
      const { body: errorResponse }: ApiErrorResponse = await request(app)
        .put('/api/customers/1')
        .send({ username: { user: 'alexm813' } })
        .set('Cookie', cookie)
        .expect(400);

      expect(errorResponse.error.info).to.include('Unknown argument `user`.');
    });

    it('Returns 400 response in the case of invalid data types.', async () => {
      const { body: errorResponse }: ApiErrorResponse = await request(app)
        .put('/api/customers/1')
        .send({ email: 123 })
        .set('Cookie', cookie)
        .expect(400);

      expect(errorResponse.error).to.include({ 
        info: 'Argument `email`: Invalid value provided. Expected String or StringFieldUpdateOperationsInput, provided Int.' 
      });
    });
  });
}

export default customerTests;