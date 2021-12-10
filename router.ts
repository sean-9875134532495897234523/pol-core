import { Application, Router } from "https://deno.land/x/oak@v10.0.0/mod.ts";
import { CustomerService } from './services/customerService.ts';

export function setRoutes(app : Application) {
    const router = new Router();
    
    setDefaultRoute(router);
    setCustomerRoutes(router);
    setProviderRoutes(router);
    setSourceRoutes(router);

    app.use(router.routes());
    app.use(router.allowedMethods());
}

function setDefaultRoute(router : Router) {
    router
    .get("/", (context) => {
        context.response.body = ':(';
    })
}

function setCustomerRoutes(router : Router) {
    router
    .get("/customers", async (context) => {
        const customerService = new CustomerService();
        context.response.body = await customerService.getCustomers();
    })
    .get("/customers/:id", async (context) => {
        const customerService = new CustomerService();
        context.response.body = await customerService.getCustomer(context.params.id);
    });
}

function setProviderRoutes(router : Router) {

}

function setSourceRoutes(router : Router) {

}