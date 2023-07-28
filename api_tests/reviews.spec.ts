import request from "supertest";
import app from '../index';
import chai, { expect } from "chai";
import chaiSorted from 'chai-sorted';
import prisma from "../prisma/prisma";
import { cookie } from "./index.spec";

chai.use(chaiSorted);

const reviewsTests = () => {
  describe('Reviews tests', () => {
    describe('/api/reviews', () => {
      it('GET returns list of all reviews.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/reviews')
          .expect(200);

        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(58);
        expect(reviews).to.be.an('array').that.has.length(25);
        expect(reviews).to.be.sortedBy("createdAt", { descending: true });
        reviews.forEach(review => {
            expect(review).to.have.all.keys('id', 'customerId', 'productId', 'title', 'body', 'recommend', 'rating', 'createdAt');
            expect(review).to.have.property('id').that.is.a('number');
            expect(review).to.have.property('customerId').that.is.a('number');
            expect(review).to.have.property('productId').that.is.a('number');
            expect(review).to.have.property('title').that.is.a('string');
            expect(review).to.have.property('body').that.is.a('string');
            expect(review).to.have.property('recommend').that.is.a('boolean');
            expect(review).to.have.property('rating').that.is.a('number').to.be.within(0, 5);
            expect(review).to.have.property('createdAt').that.is.a('string');
          });
      });

      it('GET accepts \'page\' number and \'limit\' as query parameters.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/reviews?limit=20&page=3')
          .expect(200);
        
        expect(page).to.equal(3);
        expect(count).to.equal(18);
        expect(totalResults).to.equal(58);
        expect(reviews).to.be.an('array').that.has.length(18);
        expect(reviews).to.be.sortedBy("createdAt", { descending: true });
      });

      const requestBody = {
        "customerId": 1,
        "productId": 1,
        "title": "Fundamental systemic encryption",
        "body": "Magnam recusandae tenetur fugit facere dolorum. Maxime reiciendis pariatur doloribus et.",
        "recommend": true,
        "rating": 4
      };

      it('POST allows customer to post a new review.', async () => {
        const { body: { newReview } }: 
        { body: { newReview: Review & { id: number } } } = await request(app)
          .post('/api/reviews')
          .send(requestBody)
          .set('Cookie', cookie)
          .expect(201);

        expect(newReview).to.include(requestBody);
        expect(newReview.id).to.equal(59);
      });

      it('POST does not allow customer to post a review for a product they have not ordered.', async () => {
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, productId: 49})
          .set('Cookie', cookie)
          .expect(400);

        expect(msg).to.equal('Cannot post a review for an item that has not been purchased by this customer.');
      });

      it('POST does not allow customer to post a review for another customer.', async () => {
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, customerId: 3})
          .set('Cookie', cookie)
          .expect(400);

        expect(msg).to.equal('Customer id must match current authenticated user.');
      });

      it('POST does not allow customer to post multiple reviews for the same product.', async () => {
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, productId: 40})
          .set('Cookie', cookie)
          .expect(400);

        expect(msg).to.equal('Cannot post multiple reviews for the same product.');
      });

      it('POST rejects invalid data types.', async () => {
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, title: 123})
          .set('Cookie', cookie)
          .expect(400);

        expect(msg).to.equal('Argument `title`: Invalid value provided. Expected String, provided Int.');
      });

      it('POST rejects incomplete request body.', async () => {
        const partialRequestBody = ({ title, ...object }: Review) => object;

        const { body: { msg } }:
        { body: { msg: string } } = await request(app)
          .post('/api/reviews')
          .send(partialRequestBody(requestBody))
          .set('Cookie', cookie)
          .expect(400);

        expect(msg).to.equal('Request body is missing required field(s).');
      });

      it('POST rejects blank/empty fields.', async () => {
        const { body: { msg: emptyFieldMsg } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, body: ""})
          .set('Cookie', cookie)
          .expect(400);

        const { body: { msg: blankFieldMsg } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, body: " "})
          .set('Cookie', cookie)
          .expect(400);

        expect(emptyFieldMsg).to.equal('Field(s) cannot be empty or blank.');
        expect(blankFieldMsg).to.equal('Field(s) cannot be empty or blank.');
      });

      it('POST rejects ratings over 5 or under 0.', async () => {
        const { body: { msg: firstMessage } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, rating: -1})
          .set('Cookie', cookie)
          .expect(400);

        const { body: { msg: secondMessage } }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .send({...requestBody, rating: 6})
          .set('Cookie', cookie)
          .expect(400);

        expect(firstMessage).to.equal('Rating must be a whole number between 0 and 5.');
        expect(secondMessage).to.equal(firstMessage);
      });
    });

    describe('/api/reviews/:reviewId', () => {
      it('GET returns a single review.', async () => {
        const { body }: { body: Review } = await request(app)
          .get('/api/reviews/12')
          .expect(200);
        
        expect(body).to.deep.equal({
          "id": 12,
          "customerId": 3,
          "productId": 13,
          "title": "Fundamental systemic encryption",
          "body": "Magnam recusandae tenetur fugit facere dolorum. Maxime reiciendis pariatur doloribus et.",
          "recommend": true,
          "rating": 4,
          "createdAt": "2020-12-18T09:34:00.448Z"
        });
      });

      it('GET returns 404 for nonexistent review.', async () => {
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .get('/api/reviews/59')
          .expect(404);
        
        expect(msg).to.equal('Not found.')
      });
      
      it('PUT allows customer to modify his/her own review and ignores all extra fields.', async () => {
        const { body: { updatedReview } }:
        { body: { updatedReview: Review } } = await request(app)
          .put('/api/reviews/58')
          .send({ 
            productId: 42,
            title: 'yaya', 
            body: 'Put on the black-on-black-on-slate-black blazer.',
            someRandomField: 'This should be ignored by the request handler.'
          })
          .set('Cookie', cookie)
          .expect(200);

        expect(updatedReview).to.deep.equal({
          "id": 58,
          "customerId": 1,
          "productId": 37,
          "title": "yaya",
          "body": "Put on the black-on-black-on-slate-black blazer.",
          "recommend": true,
          "rating": 5,
          "createdAt": "2018-02-07T02:09:21.275Z"
        });
      });

      it('PUT accepts an empty object as the request body and returns the original review.', async () => {
        const { body: { updatedReview } }:
        { body: { updatedReview: Review } } = await request(app)
          .put('/api/reviews/58')
          .send({})
          .set('Cookie', cookie)
          .expect(200);
        
        expect(updatedReview).to.deep.equal({
          "id": 58,
          "customerId": 1,
          "productId": 37,
          "title": "Fully-configurable cohesive infrastructure",
          "body": "Facilis beatae maxime mollitia pariatur nostrum autem. Molestiae maxime aliquid ab.",
          "recommend": true,
          "rating": 5,
          "createdAt": "2018-02-07T02:09:21.275Z"
        });
      });

      it('PUT rejects request bodies containing empty field values.', async () => {
        const { body: { msg: emptyFieldMsg } }: ApiErrorResponse = await request(app)
          .put('/api/reviews/56')
          .send({ title: "" })
          .set('Cookie', cookie)
          .expect(400);
    
        const { body: { msg: blankFieldMsg } }: ApiErrorResponse = await request(app)
          .put('/api/reviews/56')
          .send({ title: " " })
          .set('Cookie', cookie)
          .expect(400);

        expect(emptyFieldMsg).to.equal('Field(s) cannot be empty or blank.');
        expect(blankFieldMsg).to.equal('Field(s) cannot be empty or blank.');
      });

      it('PUT rejects request body containing a required field with a null value.', async () => {
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .put('/api/reviews/58')
          .send({ title: null })
          .set('Cookie', cookie)
          .expect(400);

        expect(msg).to.equal('Argument `title` must not be null.');
      });

      it('PUT rejects request body containing an invalid data type', async () => {
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .put('/api/reviews/58')
          .send({ recommend: 'yes' })
          .set('Cookie', cookie)
          .expect(400);

        expect(msg).to.include('Argument `recommend`: Invalid value provided. Expected Boolean');
      });

      it('DELETE allows user to delete own review.', async () => {
        const { body: { deletedReview } }:
        { body: { deletedReview: Review }  } = await request(app)
          .delete('/api/reviews/57')
          .set('Cookie', cookie)
          .expect(200);
        
        expect(deletedReview).to.deep.equal({
          "id": 57,
          "customerId": 1,
          "productId": 2,
          "title": "Reactive needs-based portal",
          "body": "Alias ab dolore quibusdam inventore corrupti. Error labore animi officia molestias ducimus.",
          "recommend": true,
          "rating": 0,
          "createdAt": "2017-09-04T09:41:47.982Z"
        });

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
        expect(count).to.equal(14);
        expect(totalResults).to.equal(14);
        expect(reviews).to.be.an('array').that.has.length(14);
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
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .get('/api/customers/7/reviews')
          .expect(404);

        expect(msg).to.equal('Not found.');
      });
    });

    describe('/api/products/:productId/reviews', () => {
      it('GET returns reviews for a specific product.', async () => {
        const { body: { page, count, totalResults, reviews } }:
        { body: ReviewsResponse } = await request(app)
          .get('/api/products/17/reviews')
          .expect(200);

        expect(page).to.equal(1);
        expect(count).to.equal(3);
        expect(totalResults).to.equal(3);
        expect(reviews).to.be.an('array').that.has.length(3);
        reviews.forEach(review => {
          expect(review.productId).to.equal(17);
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
        const { body: { msg } }: ApiErrorResponse = await request(app)
          .get('/api/products/70/reviews')
          .expect(404);

        expect(msg).to.equal('Not found.');
      });
    });
  });
}

export default reviewsTests;