import request from "supertest";
import app from '../index';
import { expect } from "chai";
import prisma from "../prisma/prisma";
import { cookie, setupFunction } from "./index.spec";

const requestBody = {
  "billingAddress": {
    addressLine1: '30 Bode Road',
    addressLine2: 'Suite 132',
    city: 'Castle Hettinger',
    county: 'East Sussex',
    postcode: 'SO62 9OH'
  },
  "shippingAddress": {
    addressLine1: '467 Hallie Side',
    addressLine2: 'Apt. 697',
    city: 'Streich Cross',
    county: 'Bedfordshire',
    postcode: 'GB53 0OZ'
  }
}

const addressTests = () => {
  describe('Addresses tests', () => {
    beforeEach(setupFunction);
    describe('/api/customers/:id/addresses', () => {
      it('POST allows customer to update address by referencing an existing record in the address table.', async () => {
        const { body }: { body: AddressesResponse } = await request(app)
          .post('/api/customers/1/addresses')
          .send(requestBody)
          .set('Cookie', cookie)
          .expect(200);
        
        // Ensure the new address is attached to the response body
        expect(body).to.have.property('billingAddress').that.is.deep.equal({
          ...requestBody.billingAddress,
          id: 10
        });
        
        expect(body).to.have.property('shippingAddress').that.is.deep.equal( {
          id: 8,
          addressLine1: '51 Kertzmann Park',
          addressLine2: 'Apt. 630',
          city: "O'Hara-under-Champlin-Kreiger",
          county: 'Somerset',
          postcode: 'BU72 9TW'
        });

        expect(body).to.not.have.property('newAddress');

        // Ensure the address has been added to the database table
        const allAddresses = await prisma.address.findMany();
        expect(allAddresses).to.be.an('array').that.has.length(12);

        // Ensure the customer model has been updated correctly
        const updatedCustomer = await prisma.customer.findUnique({
          where: { id: 1 }
        });
        expect(updatedCustomer!.billingAddressId).to.equal(10);
      });

      it('POST allows customer to create a new address.', async () => {
        const { body }: { body: AddressesResponse } = await request(app)
        .post('/api/customers/1/addresses')
        .send({ "shippingAddress": {
          "addressLine1": "53 Lion's Den",
          "city": "Romt",
          "postcode": "CF2 CC4"
        } })
        .set('Cookie', cookie)
        .expect(201);
        const expectedNewAddress = {
          id: 13, /* even though the id is 13, there are only 12 records in the table */
          addressLine1: "53 Lion's Den",
          addressLine2: null,
          city: "Romt",
          county: null,
          postcode: "CF2 CC4"
        };

        // Ensure the new address is attached to the response body
        expect(body).to.have.property('newAddress').that.is.deep.equal(expectedNewAddress);
        expect(body.customer).to.have.property('shippingAddress').that.is.deep.equal(expectedNewAddress);

        // Ensure the address has been added to the database table
        const allAddresses = await prisma.address.findMany();
        expect(allAddresses).to.be.an('array').that.has.length(12);
        const newAddress = await prisma.address.findUnique({ where: { id: 13 } });
        expect(newAddress).to.deep.equal(expectedNewAddress);

        // Ensure the old (unreferenced) address has been deleted
        const oldAddress = await prisma.address.findUnique({ where: { id: 8 } });
        expect(oldAddress).to.be.null;

        // Ensure the customer model has been updated correctly
        const updatedCustomer = await prisma.customer.findUnique({
          where: { id: 1 }
        });
        expect(updatedCustomer!.shippingAddressId).to.equal(13);
      });

      it('DELETE allows customer to delete his/her address if it does not have a foreign key dependency.', async () => {
        const { body: { deletedAddress } }: 
        { body: { deletedAddress: { id: number } & Address } } = await request(app)
          .delete('/api/customers/1/addresses/7?identity=billingAddressId')
          .set('Cookie', cookie)
          .expect(200);
        
        expect(deletedAddress).to.deep.equal({
          id: 7,
          addressLine1: '353 Cristian Glade',
          addressLine2: 'Apt. 626',
          city: 'South Rodriguez',
          county: 'Devon',
          postcode: 'JT0 9JE'
        });

        // Ensure customer model has been updated
        const updatedCustomer = await prisma.customer.findUnique({ where: { id: 1 } });
        expect(updatedCustomer).to.have.property('billingAddressId').that.is.null;
        expect(updatedCustomer).to.have.property('shippingAddressId').that.is.equal(8);

        // Ensure address has been deleted from db
        const expectNull = await prisma.address.findUnique({ where: { id: 7 } });
        expect(expectNull).to.be.null;
      });

      it('DELETE allows customer to remove an address from own account without deleting it from the database (due to FK constraint on Customer table).', async () => {
        const requestBody = {
          addressLine1: '467 Hallie Side',
          addressLine2: 'Apt. 697',
          city: 'Streich Cross',
          county: 'Bedfordshire',
          postcode: 'GB53 0OZ'
        };

        const { body: updateResponse }: { body: Customer & AddressGroup } = await request(app)
          .post('/api/customers/1/addresses')
          .send({ billingAddress: requestBody })
          .set('Cookie', cookie)
          .expect(200);

        expect(updateResponse.billingAddress).to.deep.equal({ ...requestBody, id: 6 });
        expect(updateResponse.billingAddressId).to.equal(6);

        const { body: deleteResponse } = await request(app)
          .delete('/api/customers/1/addresses/6?identity=billingAddressId')
          .set('Cookie', cookie)
          .expect(200);
        
        expect(deleteResponse.billingAddressId).to.be.null;
        expect(deleteResponse.billingAddress).to.be.null;
        expect(deleteResponse.shippingAddress.id).to.equal(8);
      });

      it('DELETE allows customer to remove an address from own account without deleting it from the database (due to FK constraint on OrderItem table).', async () => {
        await request(app)
          .post('/api/customers/1/addresses')
          .send({ shippingAddress: {
             addressLine1: '7 Verona Ridge',
             addressLine2: 'Apt. 786',
             city: 'Upper Bernhard-Cormier',
             county: 'Worcestershire',
             postcode: 'QV08 1DV'
          }})
          .set('Cookie', cookie)
          .expect(200);

        const { body: deleteResponse } = await request(app)
          .delete('/api/customers/1/addresses/9?identity=shippingAddressId')
          .set('Cookie', cookie)
          .expect(200);

        expect(deleteResponse.shippingAddressId).to.be.null;
        expect(deleteResponse.shippingAddress).to.be.null;
        expect(deleteResponse.billingAddress.id).to.equal(7);
      });
    });

    describe('Errors: /api/customers/:id/addresses', () => {
      it('POST returns 400 response if request is missing an address group.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/addresses')
          .send({billingAddressX: {}})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal('Request must include a billing or shipping address.');
      });

      it('POST returns 400 response if address doesn\'t contain all required fields.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/addresses')
          .send({billingAddress: {
            "addressLine1X": "7 Verona Ridge",
            "city": "Upper Berxxxnhard-Cormier",
            "postcode": "QV08 1DV"
          }})
          .set('Cookie', cookie)
          .expect(400);
        
        expect(errorResponse.error.info).to.equal("Each address must contain at least `addressLine1`, `city` and `postcode`.");
      });

      it('POST returns 400 response if address field contains invalid data type.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
          .post('/api/customers/1/addresses')
          .send({billingAddress: {
            "addressLine1": 123,
            "city": "Upper Berxxxnhard-Cormier",
            "postcode": "QV08 1DV"
          }})
          .set('Cookie', cookie)
          .expect(400);

        expect(errorResponse.error.info).to.equal("Argument `addressLine1`: Invalid value provided. Expected StringFilter or String, provided Int.");
      });

      it('DELETE returns 404 response if address id is not associated with customer account.', async () => {
        const { body: errorResponse }: ApiErrorResponse = await request(app)
        .delete('/api/customers/1/addresses/9?identity=billingAddressId')
        .set('Cookie', cookie)
        .expect(404);
      
      expect(errorResponse.error.info).to.equal("Address not found on your account.");
      });
    })
  });
}

export default addressTests;

 /*
    Info/notes on test cases:
    - I made sure to test that the customer's address is updated in the db.
    - If the address already exists in the database, the exisitng record is used to update the customer model.
    - If the address doesn't exist, a new record is created.
    - The previous address is deleted if it isn't referenced anywhere else in the db.
    - A customer can delete one or more of their registered address and their billingAddressId or shippingAddressId will be set to null. If that address isn't being referenced elsewhere, it will be deleted form the database.

    Example: In the test 'POST allows customer to create a new address.',
    we expect to update the shipping address from: 
        {
          id: 8
          addressLine1: '51 Kertzmann Park',
          addressLine2: 'Apt. 630',
          city: "O'Hara-under-Champlin-Kreiger",
          county: 'Somerset',
          postcode: 'BU72 9TW'
        }
    to:
        {
          id: 13,
          addressLine1: "53 Lion's Den",
          addressLine2: null,
          city: "Romt",
          county: null,
          postcode: "CF2 CC4"
        }
    by creating a brand-new record.
    We expect the address with id of 8 to be deleted from the database 
    (without violating the FK constraint) and a new id 13 to be inserted
    into the address table.
*/