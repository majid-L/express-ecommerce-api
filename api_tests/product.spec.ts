import request from "supertest";
import app from '../index';
import chai, { expect } from "chai";
import chaiSorted from 'chai-sorted';

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
          expect(product).to.have.all.keys('id', 'name', 'description', 'price', 'stock', 'categoryName', 'supplierName', 'thumbnail', 'numOfTimesOrdered');
          expect(product).to.have.property('id').that.is.a('number');
          expect(product).to.have.property('stock').that.is.a('number');
          expect(product).to.have.property('name').that.is.a('string');
          expect(product).to.have.property('description').that.is.a('string');
          expect(product).to.have.property('price').that.is.a('string');
          expect(product).to.have.property('categoryName').that.is.a('string');
          expect(product).to.have.property('supplierName').that.is.a('string');
          expect(product).to.have.property('thumbnail').that.is.a('string');
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
          .get('/api/products?category=toy')
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
          .get('/api/products?supplier=ie')
          .expect(200);
  
        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(26);
        products.forEach(({ supplierName }) => {
          expect(supplierName).to.satisfy((string: string): boolean => {
            return string === 'Deckow - Kiehn' || string === 'Beier LLC';
          });
        });
      });
  
      it('GET accepts \'sortBy\' as query parameter (column: product name).', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?sortBy=name')
          .expect(200);
  
        const formattedArray = products.map(product => ({...product, price: Number(product.price)}));
  
        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
        expect(formattedArray).to.be.sortedBy("name");
      });
  
      it('GET accepts \'sortBy\' and \'order\' as query parameters (column: price).', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?sortBy=price&order=desc')
          .expect(200);
  
        const formattedArray = products.map(product => ({...product, price: Number(product.price)}));
  
        expect(products).to.be.an('array').that.has.length(25);
        expect(page).to.equal(1);
        expect(count).to.equal(25);
        expect(totalResults).to.equal(53);
        expect(formattedArray).to.be.sortedBy("price", { descending: true });
      });
  
      it('GET accepts \'hideOutOfStock\' as query parameter.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?hideOutOfStock=true&sortBy=stock&order=desc&limit=100')
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
  
      it('GET accepts \'minPrice\' and \'maxPrice\' as query parameters.', async () => {
        const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
          .get('/api/products?minPrice=30.31&maxPrice=130.36&limit=100&sortBy=price')
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
  
      it('GET respondes with 400 status code if query parameter features an invalid column name.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .get('/api/products?sortBy=namee&order=desc')
          .expect(400);
  
        expect(errorResponse.error.info).to.equal('Unknown argument `namee`. Did you mean `name`?')
      });

      it('GET respondes with 400 status code if pagination query features non-numeric data types.', async () => {
        const { body: invalidPageError }: ApiErrorResponse = await request(app)
          .get('/api/products?page=xxx&limit=10')
          .expect(400);

        const { body: invalidLimitError }: ApiErrorResponse = await request(app)
          .get('/api/products?page=2&limit=xxx')
          .expect(400);
  
        expect(invalidPageError.error.info).to.equal('Invalid query. Argument `skip` is missing.');
        expect(invalidLimitError.error.info).to.equal('Invalid query. Argument `take` is missing.');
      });
    });

    describe('/api/products/bestsellers', () => {
      it('GET returns best selling items in descending order of popularity, and allows pagination.', async () => {
        const { body: { bestSellers } }:
          { body: BestSellers } = await request(app)
          .get('/api/products/bestsellers')
          .expect(200);
  
        expect(bestSellers).to.be.an('array').that.has.lengthOf(25);
        expect(bestSellers).to.be.sortedBy("numOfTimesOrdered", { descending: true });
  
        bestSellers.forEach(product => {
          expect(product).to.have.property('numOfTimesOrdered').that.is.a('number');
          expect(product).to.have.property('totalUnitsOrdered').that.is.a('number');
          expect(product).to.have.property('averageRating').that.is.a('string');
          expect(Number(product.averageRating)).to.be.a('number');
        });
  
        // Request the second page and verify the outcome
        const secondPage = await request(app)
          .get('/api/products/bestsellers?page=2&limit=10')
          .expect(200);
        
        const secondPageResults = (secondPage.body as BestSellers).bestSellers;
        expect(secondPageResults).to.be.an('array').that.has.lengthOf(10);
        expect(secondPageResults[0].id).to.not.equal(bestSellers[0].id);
      });
  
      it('GET accepts \'category\' as query parameter.', async () => {
        const { body: { bestSellers, page, count, totalResults } }: 
          { body: BestSellers } = await request(app)
          .get('/api/products/bestsellers?category=cloth')
          .expect(200);
  
        expect(bestSellers).to.be.an('array').that.has.length(6);
        expect(page).to.equal(1);
        expect(count).to.equal(6);
        expect(totalResults).to.equal(6);
        expect(bestSellers).to.be.sortedBy("numOfTimesOrdered", { descending: true });
        bestSellers.forEach(({ categoryName }) => {
          expect(categoryName).to.equal('Clothing');
        });
      });
  
      it('GET accepts \'supplier\' as query parameter.', async () => {
        const { body: { bestSellers, page, count, totalResults } }: 
          { body: BestSellers } = await request(app)
          .get('/api/products/bestsellers?supplier=bei')
          .expect(200);
  
        expect(bestSellers).to.be.an('array').that.has.length(10);
        expect(page).to.equal(1);
        expect(count).to.equal(10);
        expect(totalResults).to.equal(10);
        expect(bestSellers).to.be.sortedBy("numOfTimesOrdered", { descending: true });
        bestSellers.forEach(({ supplierName }) => {
          expect(supplierName).to.equal('Beier LLC');
        });
      });
    });

    describe('/api/products:productId', () => {
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
    });
  });
}


export default productTests;