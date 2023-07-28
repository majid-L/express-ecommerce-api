import request from "supertest";
import app from '../index';
import { expect } from "chai";
import bcrypt from 'bcrypt';
import { cookie } from "./index.spec";

const authTests = () => {
  describe('Authorisation and authentication tests', () => {
    describe('/api/login', () => {
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

    describe('/api/logout', () => {
      const agent = request.agent(app);
    
      it('Logs user out.', async () => {
        await agent.post('/api/login')
          .send({
            username: "alexnes",
            password: "password"
          })
          .expect('set-cookie', /connect.sid=.+HttpOnly;\sSameSite=None/);
    
        const response = await agent.post('/api/logout')
          .expect(200);
        
        expect(response.body.msg).to.equal('alexnes is now logged out.');
      });
    
      it('Rejects unauthenticated access.', async () => {
        const logoutResponse = await request(app)
          .post('/api/logout')
          .expect(401);
        
        expect(logoutResponse.body.msg).to.equal('Unauthenticated.');
      })
    });

    describe('Authenticated routes.', () => {
      it('GET /api/customers/:customerId forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .get('/api/customers/1')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('PUT /api/customers/:customerId forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .put('/api/customers/1')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('DELETE /api/customers/:customerId forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .delete('/api/customers/1')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('GET /api/customers/:customerId/orders forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .get('/api/customers/1/orders')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('POST /api/customers/:customerId/orders forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/orders')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('GET /api/customers/:customerId/orders/:orderId forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .get('/api/customers/1/orders/21')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('GET /api/customers/:customerId/cart forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .get('/api/customers/1/cart')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('POST /api/reviews/ forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .post('/api/reviews')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('PUT /api/reviews/:reviewId forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .put('/api/reviews/1')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });

      it('DELETE /api/reviews/:reviewId forbids unauthenticated access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .delete('/api/reviews/1')
          .expect(401);
        
        expect(msg).to.equal('Unauthenticated.');
      });
    });

    describe('Authorised routes.', () => {
      it('GET /api/customers/:customerId forbids unauthorised access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .get('/api/customers/3')
          .set('Cookie', cookie)
          .expect(403);
        
        expect(msg).to.equal('Unauthorised.');
      });

      it('PUT /api/customers/:customerId forbids unauthorised access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .put('/api/customers/3')
          .set('Cookie', cookie)
          .expect(403);
        
        expect(msg).to.equal('Unauthorised.');
      });

      it('DELETE /api/customers/:customerId forbids unauthorised access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .delete('/api/customers/3')
          .set('Cookie', cookie)
          .expect(403);
        
        expect(msg).to.equal('Unauthorised.');
      });

      it('GET /api/customers/:customerId/orders forbids unauthorised access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .get('/api/customers/3/orders')
          .set('Cookie', cookie)
          .expect(403);
        
        expect(msg).to.equal('Unauthorised.');
      });

      it('GET /api/customers/:customerId/cart forbids unauthorised access.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .get('/api/customers/3/cart')
          .set('Cookie', cookie)
          .expect(403);
        
        expect(msg).to.equal('Unauthorised.');
      });

      it('PUT /api/reviews/:reviewId forbids user from modifying another customer\'s review.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .put('/api/reviews/55')
          .set('Cookie', cookie)
          .expect(403);
        
        expect(msg).to.equal('Unauthorised.');
      });

      it('DELETE /api/reviews/:reviewId forbids user from deleting another customer\'s review.', async () => {
        const { body: { msg} }: ApiErrorResponse = await request(app)
          .delete('/api/reviews/54')
          .set('Cookie', cookie)
          .expect(403);
        
        expect(msg).to.equal('Unauthorised.');
      });

    });
  });
}

export default authTests;