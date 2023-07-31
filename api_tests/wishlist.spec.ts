import request from "supertest";
import app from '../index';
import reseedDatabase from '../prisma/seed';
import { expect } from "chai"
import { setupFunction } from "./index.spec";

let cookie: string;

const wishlistTests = () => {
  describe('Wishlist tests.', () => {
    describe('/api/customers/:id/wishlist', () => {
      beforeEach(async () => {
        await reseedDatabase();
        const authResponse = await request(app)
          .post('/api/login')
          .send({username: 'Frida93', password: 'password'});

        cookie = authResponse.headers['set-cookie'];
      });

      it('GET returns the customer\'s wishlist.', async () => {
        const { body }: { body: WishlistResponse } = await request(app)
          .get('/api/customers/3/wishlist')
          .set('Cookie', cookie)
          .expect(200);
        
        expect(body.wishlist).to.have.all.keys(['id', 'name', 'username', 'wishlistItems']);
        expect(body.wishlist.wishlistItems).to.be.an('array').that.has.length(11);
      });

      it('GET accepts a \'format\' quey that displays a simplified JSON response.', async () => {
        const { body: { wishlist } }: 
        { body: { wishlist: WishlistItem[] } } = await request(app)
          .get('/api/customers/3/wishlist?format=basic')
          .set('Cookie', cookie)
          .expect(200);
        
        wishlist.forEach((item) => {
          expect(item.customerId).to.equal(3);
          expect(item).to.have.property('productId').that.is.a('number');
          expect(Object.keys(item)).to.have.length(2);
        });
      });

      it('PUT allows customer to update wishlist. Extra request body properties are ignored.', async () => {
        const requestBody = [
          {
            "customerId": 3,
            "productId": 42,
            "sdsds": true
          },
          {
            "customerId": 3,
            "productId": 5,
            "s83r3f": null
          },
          {
            "customerId": 3,
            "productId": 12,
            1234545: { a: false }
          }];

        const { body: { wishlist } }: 
        { body: { wishlist: WishlistItem[] } } = await request(app)
          .put('/api/customers/3/wishlist?format=basic')
          .send(requestBody)
          .set('Cookie', cookie)
          .expect(200);
        
        expect(wishlist).to.deep.equal(requestBody
          .map(({ customerId, productId }) => ({ customerId, productId })));
      });

      it('PUT customer can clear his/her wishlist.', async () => {
        const { body: { wishlist } }: 
        { body: { wishlist: WishlistItem[] } } = await request(app)
          .put('/api/customers/3/wishlist')
          .send([])
          .set('Cookie', cookie)
          .expect(200);
        
        expect(wishlist).to.be.an('array').that.is.empty;
      });

      it('PUT rejects request bodies missing required properties (customerId).', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .put('/api/customers/3/wishlist')
          .send([{
            "customeXrId": 3,
            "productId": "yaya"
          }])
          .set('Cookie', cookie)
          .expect(400);
        
        expect(errorResponse.error.info).to.equal("Invalid request body format.");
      });

      it('PUT rejects request bodies missing required properties (productId).', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .put('/api/customers/3/wishlist')
          .send([{
            "customerId": 3,
            "producxtId": "yaya"
          }])
          .set('Cookie', cookie)
          .expect(400);
        
        expect(errorResponse.error.info).to.equal("Invalid request body format.");
      });

      it('PUT prevents customer from adding wishlist items under the wrong customer id.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .put('/api/customers/3/wishlist')
          .send([{
            "customerId": 5,
            "productId": 42,
            "sdsds": true
          }])
          .set('Cookie', cookie)
          .expect(400);
        
        expect(errorResponse.error.info).to.equal('Invalid customer id on cart/wishlist item.');
      });

      it('PUT rejects request bodies with incorrect data types.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .put('/api/customers/3/wishlist')
          .send([{
            "customerId": 3,
            "productId": "yaya",
            "sdsds": true,
            "gemu": "lack"
          }])
          .set('Cookie', cookie)
          .expect(400);
        
        expect(errorResponse.error.info).to.equal("Argument `id`: Invalid value provided. Expected Int, provided String.");
      });

      it('PUT rejects request body with nonexistent product id.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .put('/api/customers/3/wishlist')
          .send([{
            "customerId": 3,
            "productId": 62,
            "additionProperty": true,
            "randomProperty": "xxxxxxx"
          }])
          .set('Cookie', cookie)
          .expect(404);
      
        expect(errorResponse.error.info).to.equal("Product with id 62 does not exist."); 
      });
    });
  });
}

export default wishlistTests;