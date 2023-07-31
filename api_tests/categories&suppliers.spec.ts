import request from "supertest";
import app from '../index';
import { expect } from "chai"

const categoriesAndSuppliersTests = () => {
  describe('/api/categories AND /api/suppliers', () => {
    it('GET returns list of all categories.', async () => {
        const { body: { categories } }: 
        { body: { categories: (Category & { id: number })[] } } = await request(app)
          .get('/api/categories')
          .expect(200);

        expect(categories).to.be.an('array').that.has.length(4);
        categories.forEach(({id, name, description, thumbnail, products}) => {
           expect(id).to.be.a('number');
           expect(name).to.be.a('string');
           expect(description).to.be.a('string');
           expect(thumbnail).to.be.a('string');
           expect(products).to.be.a('number');
        });
    });

    it('GET returns list of all suppliers.', async () => {
      const { body: { suppliers } }: 
      { body: { suppliers: (Supplier & { id: number })[] } } = await request(app)
        .get('/api/suppliers')
        .expect(200);

      expect(suppliers).to.be.an('array').that.has.length(4);
      suppliers.forEach(({id, name, location, establishYear, thumbnail, products}) => {
        expect(id).to.be.a('number');
        expect(name).to.be.a('string');
        expect(location).to.be.a('string');
        expect(establishYear).to.be.a('number');
        expect(thumbnail).to.be.a('string');
        expect(products).to.be.a('number');
      });
    });
  });
}

export default categoriesAndSuppliersTests;