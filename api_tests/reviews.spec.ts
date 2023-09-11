import request from "supertest";
import app from '../index';
import chai, { expect } from "chai";
import chaiSorted from 'chai-sorted';
import prisma from "../prisma/prisma";
import { cookie, setupFunction } from "./index.spec";

chai.use(chaiSorted);

const reviewsTests = () => {
  describe('Reviews tests', () => {
    describe('/api/reviews', () => {
      beforeEach(setupFunction);

      it('GET returns list of all reviews.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/reviews')
          .expect(200);

        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(57);
        expect(reviews).to.be.an('array').that.has.length(25);
        expect(reviews).to.be.sortedBy("createdAt", { descending: true });
        reviews.forEach(review => {
            expect(review).to.have.all.keys('id', 'customerId', 'productId', 'orderId', 'title', 'body', 'recommend', 'rating', 'createdAt', 'customer', 'product');
            expect(review).to.have.property('id').that.is.a('number');
            expect(review).to.have.property('customerId').that.is.a('number');
            expect(review).to.have.property('productId').that.is.a('number');
            expect(review).to.have.property('title').that.is.a('string');
            expect(review).to.have.property('body').that.is.a('string');
            expect(review).to.have.property('recommend').that.is.a('boolean');
            expect(review).to.have.property('rating').that.is.a('number').to.be.within(0, 5);
            expect(review).to.have.property('createdAt').that.is.a('string');
            expect(review).to.have.property('customer').that.is.a('object').with.all.keys('username', 'avatar');
          });
      });

      it('GET accepts \'page\' number and \'limit\' as query parameters.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/reviews?limit=20&page=3')
          .expect(200);
        
        expect(page).to.equal(3);
        expect(count).to.equal(17);
        expect(totalResults).to.equal(57);
        expect(reviews).to.be.an('array').that.has.length(17);
        expect(reviews).to.be.sortedBy("createdAt", { descending: true });
      });

      const requestBody = {
        "customerId": 1,
        "productId": 2,
        "orderId": 21,
        "title": "Fundamental systemic encryption",
        "body": "Magnam recusandae tenetur fugit facere dolorum. Maxime reiciendis pariatur doloribus et.",
        "recommend": true,
        "rating": 4
      };

      it('POST allows customer to post a new review.', async () => {
        const { body: { newReview } }: 
        { body: { newReview: Review & ReviewExtended & { id: number } } } = 
          await request(app)
            .post('/api/reviews')
            .send(requestBody)
            .set('Cookie', cookie)
            .expect(201);

        expect(newReview).to.include(requestBody);
        expect(newReview.id).to.equal(58);
      });

      it('POST does not allow customer to post a review for a product they have not ordered.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, productId: 49})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Cannot post a review for an item that has not been purchased by this customer.');
      });

      it('POST does not allow customer to post a review for another customer.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, customerId: 3})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Customer id must match current authenticated user.');
      });

      it('POST does not allow customer to post multiple reviews for the same product.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, productId: 40})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Cannot post multiple reviews for the same product.');
      });

      it('POST rejects invalid data types.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, title: 123})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Argument `title`: Invalid value provided. Expected String, provided Int.');
      });

      it('POST rejects incomplete request body.', async () => {
        const partialRequestBody = ({ title, ...object }: Review) => object;

        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send(partialRequestBody(requestBody))
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Request body is missing required field(s).');
      });

      it('POST rejects blank/empty fields.', async () => {
        const { body: firstErrorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, body: ""})
          .set('Cookie', cookie)
          .expect(400);

        const { body: secondErrorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, body: " "})
          .set('Cookie', cookie)
          .expect(400);

        expect(firstErrorResponse.error.info).to.equal('Field(s) cannot be empty or blank.');
        expect(secondErrorResponse.error.info).to.equal('Field(s) cannot be empty or blank.');
      });

      it('POST rejects ratings over 5 or under 0.', async () => {
        const { body: firstErrorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, rating: -1})
          .set('Cookie', cookie)
          .expect(400);

        const { body: secondErrorResponse }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, rating: 6})
          .set('Cookie', cookie)
          .expect(400);

        expect(firstErrorResponse.error.info).to.equal('Rating must be a whole number between 0 and 5.');
        expect(secondErrorResponse.error.info).to.equal('Rating must be a whole number between 0 and 5.');
      });
    });

    describe('/api/reviews/:reviewId', () => {
      beforeEach(setupFunction);
      
      it('GET returns a single review.', async () => {
        const { body }: { body: Review & ReviewExtended } = await request(app)
          .get('/api/reviews/12')
          .expect(200);
        
        expect(body).to.include({
          "id": 12,
          "customerId": 2,
          "productId": 44,
          "orderId": 5,
          "title": "Implemented exuding emulation",
          "body": "Molestias aut libero voluptatem laborum eaque non vitae.",
          "recommend": true,
          "rating": 4,
          "createdAt": "2020-01-27T23:15:16.134Z"
        });
      });

      it('GET returns 404 for nonexistent review.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .get('/api/reviews/64')
          .expect(404);
        
        expect(errorResponse.error.info).to.equal('Not found.')
      });

      const review57 = {
        "id": 57,
        "customerId": 1,
        "productId": 37,
        "orderId": 22,
        "title": "Configurable methodical approach",
        "body": "Labore eligendi autem minus minima sapiente recusandae. Repellat aspernatur pariatur nihil. Nulla officiis cumque magni quas blanditiis quia rerum.",
        "recommend": true,
        "rating": 0,
        "createdAt": "2021-06-13T18:28:34.662Z"
      };
      
      it('PUT allows customer to modify his/her own review and ignores all extra fields.', async () => {
        const { body: { updatedReview } }:
        { body: { updatedReview: Review & ReviewExtended } } = await request(app)
          .put('/api/reviews/57')
          .send({ 
            productId: 1,
            title: 'yaya', 
            body: 'Put on the black-on-black-on-slate-black blazer.',
            someRandomField: 'This should be ignored by the request handler.'
          })
          .set('Cookie', cookie)
          .expect(200);

        expect(updatedReview).to.include({
          ...review57,
          title: 'yaya',
          body: 'Put on the black-on-black-on-slate-black blazer.'
        });
      });

      it('PUT accepts an empty object as the request body and returns the original review.', async () => {
        const { body: { updatedReview } }:
        { body: { updatedReview: Review & ReviewExtended } } = await request(app)
          .put('/api/reviews/57')
          .send({})
          .set('Cookie', cookie)
          .expect(200);
        
        expect(updatedReview).to.include(review57);
      });

      it('PUT rejects request bodies containing empty field values.', async () => {
        const { body: firstErrorResponse }: ApiErrorResponse = await request(app)
          .put('/api/reviews/56')
          .send({ title: "" })
          .set('Cookie', cookie)
          .expect(400);
    
        const { body: secondErrorResponse }: ApiErrorResponse = await request(app)
          .put('/api/reviews/56')
          .send({ title: " " })
          .set('Cookie', cookie)
          .expect(400);

        expect(firstErrorResponse.error.info).to.equal('Field(s) cannot be empty or blank.');
        expect(secondErrorResponse.error.info).to.equal('Field(s) cannot be empty or blank.');
      });

      it('PUT rejects request body containing a required field with a null value.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .put('/api/reviews/57')
          .send({ title: null })
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Argument `title` must not be null.');
      });

      it('PUT rejects request body containing an invalid data type', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .put('/api/reviews/57')
          .send({ recommend: 'yes' })
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.include('Argument `recommend`: Invalid value provided. Expected Boolean');
      });

      it('DELETE allows user to delete own review.', async () => {
        const { body: { deletedReview } }:
        { body: { deletedReview: Review & ReviewExtended }  } = await request(app)
          .delete('/api/reviews/57')
          .set('Cookie', cookie)
          .expect(200);
        
        expect(deletedReview).to.include(review57);

        await request(app)
          .get('/api/reviews/57')
          .expect(404);

        const nullResult = await prisma.review.findUnique({
          where: { id: 57 }
        });

        expect(nullResult).to.be.null;
      });
    });

    describe('/api/customers/:customerId/reviews', () => {
      it('GET returns all reviews for a single customer.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/customers/5/reviews')
          .expect(200);

        expect(page).to.equal(1);
        expect(count).to.equal(8);
        expect(totalResults).to.equal(8);
        expect(reviews).to.be.an('array').that.has.length(8);
        reviews.forEach(review => {
          expect(review.customerId).to.equal(5);
        });
      });

      it('GET a new customer should have no reviews.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/customers/6/reviews')
          .expect(200);

        expect(page).to.equal(1);
        expect(count).to.equal(0);
        expect(totalResults).to.equal(0);
        expect(reviews).to.be.an('array').that.is.empty;
      });

      it('GET responds with 404 status code for non-existent customer.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .get('/api/customers/7/reviews')
          .expect(404);

        expect(errorResponse.error.info).to.equal('Not found.');
      });
    });

    describe('/api/products/:productId/reviews', () => {
      it('GET returns reviews for a specific product.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/products/1/reviews')
          .expect(200);

        expect(page).to.equal(1);
        expect(count).to.equal(3);
        expect(totalResults).to.equal(3);
        expect(reviews).to.be.an('array').that.has.length(3);
        reviews.forEach(review => {
          expect(review.productId).to.equal(1);
        });
      });

      it('GET returns empty array for a product with no reviews.', async () => {
        const { body }: { body: ReviewsResponse } = await request(app)
          .get('/api/products/10/reviews')
          .expect(200);

        expect(body).to.deep.equal({
          "page": 1,
          "count": 0,
          "totalResults": 0,
          "reviews": []
        });
      });

      it('GET responds with 404 status code for non-existent product.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .get('/api/products/70/reviews')
          .expect(404);

        expect(errorResponse.error.info).to.equal('Not found.');
      });
    });
  });
}

export default reviewsTests;