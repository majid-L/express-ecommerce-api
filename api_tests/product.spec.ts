import request from "supertest";
import app from '../index';
import { expect } from "chai";

const productTests = () => {
  describe('api/products', () => {
    it('Returns array of all products.', async () => {
      const { body: { products } }: 
        { body: { products: Product[] } } = await request(app)
        .get('/api/products')
        .expect(200);

      expect(products).to.be.an('array').that.has.lengthOf(25);
      products.forEach(product => {
        expect(product).to.have.all.keys('id', 'name', 'description', 'price', 'stock', 'categoryName', 'supplierName', 'thumbnail');
        expect(product.id).to.be.a('number');
        expect(product.stock).to.be.a('number');
        expect(product.name).to.be.a('string');
        expect(product.description).to.be.a('string');
        expect(product.price).to.be.a('string');
        expect(product.categoryName).to.be.a('string');
        expect(product.supplierName).to.be.a('string');
        expect(product.thumbnail).to.be.a('string');
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
}

export default productTests;