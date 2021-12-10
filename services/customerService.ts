import { CustomerSchema, CreateCustomerModel } from '../db_schemas/schemas.ts';
import { CustomerRepository } from '../repositories/customerRepository.ts';
import { getMetaDataObject } from './metadataService.ts';

export class CustomerService {
    async getCustomers() : Promise<CustomerSchema[]> {
        const repo = new CustomerRepository();
        const customers = await repo.getCustomers();
        return new Promise((resolve) => { resolve(customers); });
    }

    async getCustomer(id: string) : Promise<CustomerSchema> {
        const repo = new CustomerRepository();
        const customer = await repo.getCustomer(id);
        return new Promise((resolve) => { resolve(customer as object as any); });
    }

    async  createCustomer(data : Record<string, string>) : Promise<CustomerSchema> {
        let model : CustomerSchema = {
            _id: null as any,
            created: undefined as any,
            first_name: data['first_name'],
            last_name: data['last_name'],
            metadata: getMetaDataObject(data)
        };
        const repo = new CustomerRepository();
        model = await repo.insertCustomer(model) as CustomerSchema;
        return new Promise((resolve) => { resolve(model); });
    }

    async updateCustomer(data : Record<string, string>, id: string) : Promise<CustomerSchema> {
        const existingCustomer = await this.getCustomer(id);
        existingCustomer.first_name = data['first_name'];
        existingCustomer.last_name = data['last_name'];
        existingCustomer.metadata = getMetaDataObject(data);
        const repo = new CustomerRepository();
        await repo.updateCustomer(existingCustomer);
        return new Promise((resolve) => { resolve(existingCustomer); });
    }
}