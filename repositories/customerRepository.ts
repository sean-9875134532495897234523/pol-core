import { Bson } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { getClient } from './client.ts';
import { CustomerSchema, CreateCustomerModel } from '../db_schemas/schemas.ts';

export class CustomerRepository {
  collection: string;
 
  constructor() {
    this.collection = 'customers';
  }
 
  async getCustomers() {
    const client = await getClient();
    const db = client.database(Deno.env.get('DEFAULT_DATABASE'));
    const customers = db.collection<CustomerSchema>(this.collection);
    return await customers.find({}, { noCursorTimeout: false}).toArray();
  }

  async getCustomer(id: string) {
    const client = await getClient();
    const db = client.database(Deno.env.get('DEFAULT_DATABASE'));
    const customers = db.collection<CustomerSchema>(this.collection);
    return await customers.findOne({ _id: new Bson.ObjectId(id) }, { noCursorTimeout: false});
  }

  async insertCustomer(customer: CustomerSchema) {
    const client = await getClient();
    const db = client.database(Deno.env.get('DEFAULT_DATABASE'));
    const customers = db.collection<CustomerSchema>(this.collection);
    customer._id = null as any;
    customer.created = new Date();
    customer._id = await customers.insertOne(customer);
    return new Promise((resolve) => { resolve(customer) });
  }
  
  async updateCustomer(customer: CustomerSchema) : Promise<boolean> {
    const client = await getClient();
    const db = client.database(Deno.env.get('DEFAULT_DATABASE'));
    const customers = db.collection<CustomerSchema>(this.collection);

    const { modifiedCount } = await customers.updateOne(
      { _id: { $eq: customer._id } },
      { $set: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        metadata: customer.metadata
      } });
    
    return new Promise((resolve) => { resolve(modifiedCount === 1) });
  }
}