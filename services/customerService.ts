import { CustomerSchema } from '../db_schemas/schemas.ts';
import { CustomerRepository } from '../repositories/customerRepository.ts';

export class CustomerService {
    async getCustomers() : Promise<CustomerSchema[]> {
        const repo = new CustomerRepository();
        const customers = await repo.getCustomers();
        return new Promise((resolve) => { resolve(customers); });
    }

    async getCustomer(id: string) : Promise<CustomerSchema[]> {
        const repo = new CustomerRepository();
        const customers = await repo.getCustomer(id);
        return new Promise((resolve) => { resolve(customers); });
    }
}