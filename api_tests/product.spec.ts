import request from "supertest";
import app from '../index';
import { expect } from "chai";

const productTests = () => {
  describe('api/products', () => {
    it('Returns array of all products.', async () => {
      const { body: { products, page, count, totalResults } }: 
        { body: ProductsResponse } = await request(app)
        .get('/api/products')
        .expect(200);

      expect(page).to.equal(1);
      expect(count).to.equal(25);
      expect(totalResults).to.equal(60);
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

    it('Accepts page number and limit as query parameters.', async () => {
      const { body: { products } }: 
      { body: { products: Product[] } } = await request(app)
        .get('/api/products?page=2&limit=20')
        .expect(200);
    
      expect(products).to.be.an('array').that.has.lengthOf(20);
      expect(products[0]).to.haveOwnProperty('id').to.eql(21);
      expect(products[19]).to.haveOwnProperty('id').to.eql(40);
    });
  });

  describe('/api/products/bestsellers', () => {
    it('Returns best selling items in descending order of popularity, and allows pagination.', async () => {
      const { body: { bestSellers } }: BestSellers = await request(app)
        .get('/api/products/bestsellers')
        .expect(200);

      expect(bestSellers).to.be.an('array').that.has.lengthOf(25);

      bestSellers.forEach((product, index: number) => {
        expect(product).to.have.property('numOfTimesOrdered').that.is.a('number');
        expect(product).to.have.property('totalUnitsOrdered').that.is.a('number');
        if (index > 0) {
          expect(product.numOfTimesOrdered)
            .to.be.lessThanOrEqual(bestSellers[index - 1].numOfTimesOrdered);
        }
      });

      // Request the second page and verify the outcome
      const secondPage = await request(app)
        .get('/api/products/bestsellers?page=2&limit=30')
        .expect(200);
      
      const secondPageResults = (secondPage as BestSellers).body.bestSellers;
      expect(secondPageResults).to.be.an('array').that.has.lengthOf(30);
      expect(secondPageResults[0].id).to.not.equal(bestSellers[0].id);
    });
  });
}

export default productTests;