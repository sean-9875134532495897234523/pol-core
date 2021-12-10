import { Bson } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { getClient } from './client.ts';
import { CustomerSchema } from '../db_schemas/schemas.ts';

export class CustomerRepository {
  collection: string;
 
  constructor() {
    this.collection = 'customers';
  }
 
  async getCustomers() {
    const client = await getClient();
    const db = client.database(Deno.env.get('DEFAULT_DATABASE'));
    const users = db.collection<CustomerSchema>(this.collection);
    return await users.find({}, { noCursorTimeout: false}).toArray();
  }

  async getCustomer(id: string) {
    const client = await getClient();
    const db = client.database(Deno.env.get('DEFAULT_DATABASE'));
    const users = db.collection<CustomerSchema>(this.collection);
    return await users.findOne({ _id: new Bson.ObjectId(id) }, { noCursorTimeout: false});
  }
}