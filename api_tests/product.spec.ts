import request from "supertest";
import app from '../index';
import chai, { expect } from "chai";
import chaiSorted from 'chai-sorted';
import { cookie, setupFunction } from "./index.spec";

let userCookie = cookie;
chai.use(chaiSorted);

const productTests = () => {
  describe('Products tests', () => {
    describe('api/products', () => {
      it('GET returns array of all products.', async () => {
        const { body: { products, page, count, totalResults } }: 
          { body: ProductsResponse } = await request(app)
          .get('/api/products')
          .expect(200);
  
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
        expect(products).to.be.an('array').that.has.lengthOf(25);
  
        products.forEach(product => {
          expect(product).to.have.all.keys('id', 'name', 'description', 'price', 'stock', 'categoryName', 'supplierName', 'thumbnail', 'numOfTimesOrdered', 'totalUnitsOrdered', 'numOfReviews', 'averageRating');
          expect(product).to.have.property('id').that.is.a('number');
          expect(product).to.have.property('stock').that.is.a('number');
          expect(product).to.have.property('name').that.is.a('string');
          expect(product).to.have.property('description').that.is.a('string');
          expect(product).to.have.property('price').that.is.a('string');
          expect(product).to.have.property('categoryName').that.is.a('string');
          expect(product).to.have.property('supplierName').that.is.a('string');
          expect(product).to.have.property('thumbnail').that.is.a('string');
          expect(product).to.have.property('numOfTimesOrdered').that.is.a('number');
          expect(product).to.have.property('numOfReviews').that.is.a('number');
          expect(product.totalUnitsOrdered).to.satisfy((value: number | null) => {
            return value === null || typeof value === 'number';
          });
          expect(product.averageRating).to.satisfy((value: string | null) => {
            return value === null || typeof value === 'string';
          });
        });
      });
  
      it('GET accepts \'page\' number and \'limit\' as query parameters.', async () => {
        const { body: { products } }: 
        { body: { products: Product[] } } = await request(app)
          .get('/api/products?page=2&limit=20')
          .expect(200);
      
        expect(products).to.be.an('array').that.has.lengthOf(20);
        expect(products[0]).to.haveOwnProperty('id').to.eql(21);
        expect(products[19]).to.haveOwnProperty('id').to.eql(40);
      });
  
      it('GET accepts \'category\' as a query parameter.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?category=Toys')
          .expect(200);
  
        expect(products).to.be.an('array').that.has.length(8);
        expect(page).to.equal(1);
        expect(count).to.equal(8);
        expect(totalResults).to.equal(8);
        products.forEach(({ categoryName }) => {
          expect(categoryName).to.equal('Toys');
        });
      });
  
      it('GET accepts \'supplier\' as a query parameter.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?supplier=Deckow%20-%20Kiehn')
          .expect(200);
  
        expect(products).to.be.an('array').that.has.length(12);
        expect(page).to.equal(1);
        expect(count).to.equal(12);
        expect(totalResults).to.equal(12);
        products.forEach(({ supplierName }) => {
          expect(supplierName).to.satisfy((string: string): boolean => {
            return string === 'Deckow - Kiehn';
          });
        });
      });
  
      it('GET accepts \'orderBy\' as query parameter (column: product name).', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?orderBy=name')
          .expect(200);
  
        const formattedArray = products.map(product => ({...product, price: Number(product.price)}));
  
        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
        expect(formattedArray).to.be.sortedBy("name");
      });
  
      it('GET accepts \'orderBy\' and \'order\' as query parameters (column: price).', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?orderBy=price&order=desc')
          .expect(200);
  
        const formattedArray = products.map(product => ({...product, price: Number(product.price)}));
  
        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
        expect(formattedArray).to.be.sortedBy("price", { descending: true });
      });

      it('GET allows results to be ordered by avgRating.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?orderBy=avgRating&order=desc')
          .expect(200);
  
        const formattedArray = products.map(product => ({...product, averageRating: Number(product.averageRating)}));
  
        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
        expect(formattedArray).to.be.sortedBy("averageRating", { descending: true });
      });

      it('GET allows results to be ordered by bestsellers (numOfTimesOrdered).', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?orderBy=bestsellers&order=desc')
          .expect(200);
  
        const formattedArray = products.map(product => ({...product, numOfTimesOrdered: product.numOfTimesOrdered}));
  
        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
        expect(formattedArray).to.be.sortedBy("numOfTimesOrdered", { descending: true });
      });
  
      it('GET accepts \'hideOutOfStock\' as query parameter.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?hideOutOfStock=true&orderBy=stock&order=desc&limit=100')
          .expect(200);
  
        expect(products).to.be.an('array').that.has.length(50);
        expect(page).to.equal(1);
        expect(count).to.equal(50);
        expect(totalResults).to.equal(50);
        expect(products).to.be.sortedBy("stock", { descending: true });
        products.forEach(product => {
          expect(product.stock).to.not.equal(0);
        })
      });

      it('GET accepts \'avgRating\' as query parameter.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?avgRating=4')
          .expect(200);
  
        expect(products).to.be.an('array').that.has.length(9);
        expect(page).to.equal(1);
        expect(count).to.equal(9);
        expect(totalResults).to.equal(9);
        products.forEach(product => {
          expect(Math.round(Number(product.averageRating))).to.equal(4);
        })
      });
  
      it('GET accepts \'minPrice\' and \'maxPrice\' as query parameters.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?minPrice=30.31&maxPrice=130.36&limit=100&orderBy=price')
          .expect(200);
  
        const formattedArray = products.map(product => ({...product, price: Number(product.price)}));
  
        expect(products).to.be.an('array').that.has.length(39);
        expect(formattedArray).to.be.sortedBy("price", { descending: false });
        expect(page).to.equal(1);
        expect(count).to.equal(39);
        expect(totalResults).to.equal(39);
        products.forEach(({ price }) => {
          expect(Number(price)).to.be.within(30.31, 130.36);
        });
      });

      it('GET allows searching for specific product(s) by name.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?product=salad')
          .expect(200);

        expect(products).to.be.an('array').that.has.length(4);
        expect(page).to.equal(1);
        expect(count).to.equal(4);
        expect(totalResults).to.equal(4);
        products.forEach(product => {
          expect(product.name).to.match(/salad/i);
        });
      });

      it('GET ignores pagination query parameter with non-numeric data types.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?page=x&limit=x')
          .expect(200);

        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
      });
    });

    describe('/api/products/:productId', () => {
      beforeEach(setupFunction);

      it('GET returns a single product.', async () => {
        const { body: product }: { body: Product } = await request(app)
          .get('/api/products/13')
          .expect(200);

        expect(product).to.deep.equal({
          "id": 13,
          "name": "Incredible Rubber Pizza",
          "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
          "price": "40.94",
          "stock": 138,
          "categoryName": "Health",
          "supplierName": "Heathcote - Murazik",
          "thumbnail": "https://loremflickr.com/640/480/Health?lock=4774374158630912",
          "averageRating": "3.0",
          "totalRatings": 1,
          "numOfTimesOrdered": 1
        });
      });

      it('GET returns correctly structured response for a product with 0 orders.', async () => {
        const { body: product }: { body: Product } = await request(app)
          .get('/api/products/35')
          .expect(200);

        expect(product).to.deep.equal({
          "id": 35,
          "name": "Refined Cotton Salad",
          "description": "The Football Is Good For Training And Recreational Purposes",
          "price": "30.31",
          "stock": 27,
          "categoryName": "Health",
          "supplierName": "Deckow - Kiehn",
          "thumbnail": "https://loremflickr.com/640/480/Health?lock=248160802832384",
          "totalRatings": 0,
          "numOfTimesOrdered": 0
        });
      });

      it('GET returns 404 for non-existent product.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .get('/api/products/54')
          .expect(404);

        expect(errorResponse.error.info).to.equal('Not found.');
      });

      it('PUT allows user to update stock amount for a specific product.', async () => {
        const { body: { updatedProduct } }:
        { body: { updatedProduct: Product } } = await request(app)
          .put('/api/products/1')
          .send({ stock: 726 })
          .set('Cookie', cookie)
          .expect(200);

        expect(updatedProduct).to.have.property("stock").that.is.equal(726);
      });

      it('PUT accepts stock value if it is a valid numerical string.', async () => {
        const { body: { updatedProduct } }:
        { body: { updatedProduct: Product } } = await request(app)
          .put('/api/products/2')
          .send({ stock: "18" })
          .set('Cookie', cookie)
          .expect(200);

        expect(updatedProduct).to.have.property("stock").that.is.equal(18);
      });

      it('PUT returns 400 response for invalid stock amount.', async () => {
        const { body: errorResponse1 }: ApiErrorResponse = await request(app)
          .put('/api/products/1')
          .send({ stock: -1 })
          .set('Cookie', cookie)
          .expect(400);

         const { body: errorResponse2 }: ApiErrorResponse = await request(app)
          .put('/api/products/1')
          .send({ stock: "one" })
          .set('Cookie', cookie)
          .expect(400);
  
        expect(errorResponse1.error.info).to.equal('Invalid stock amount.');
        expect(errorResponse2.error.info).to.equal('Invalid stock amount.');
      });
    });

    describe('/api/customers/:id/favorites', () => {
      beforeEach(async () => {
        const authResponse = await request(app)
          .post('/api/login')
          .send({username: 'Frida93', password: 'password'});

        userCookie = authResponse.headers['set-cookie'];
      });

      it('GET returns a customer\'s favorite items.', async () => {
        const { body: { page, count, totalResults, favorites } }: 
        { body: Favorites } = await request(app)
          .get('/api/customers/3/favorites')
          .set('Cookie', userCookie)
          .expect(200);
        
        expect(page).to.equal(1);
        expect(count).to.equal(9);
        expect(totalResults).to.equal(9);
        expect(favorites).to.be.sortedBy('addedAt', { descending: true });
        favorites.forEach(({ recommend }) => {
          expect(recommend).to.be.true;
        });
      });

      it('GET accepts \'page\' number and \'limit\' as query parameters.', async () => {
        const { body: { page, count, totalResults, favorites } }: 
        { body: Favorites } = await request(app)
          .get('/api/customers/3/favorites?page=2&limit=4')
          .set('Cookie', userCookie)
          .expect(200);
        
        expect(page).to.equal(2);
        expect(count).to.equal(4);
        expect(totalResults).to.equal(9);
        expect(favorites).to.be.sortedBy('addedAt', { descending: true });
      });
    });
  });
}


export default productTests;