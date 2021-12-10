import { Application, Router, Context } from "https://deno.land/x/oak@v10.0.0/mod.ts";
import { CustomerService } from './services/customerService.ts';
import {
       Status,
       STATUS_TEXT,
     } from "https://deno.land/std@0.117.0/http/http_status.ts";

export function setRoutes(app : Application) {
    const router = new Router();
    
    // setDefaultRoute(router);
    setCustomerRoutes(router);
    setProviderRoutes(router);
    setSourceRoutes(router);

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.use((ctx) => {
        sendNotFound(ctx);
    });
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
        const customer = await customerService.getCustomer(context.params.id);
        if (!hasData(customer)) {
            sendNotFound(context);
        } else {
            context.response.body = customer;
        }
    });
}

function setProviderRoutes(router : Router) {

}

function setSourceRoutes(router : Router) {

}

function hasData(obj: Object) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return !(Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)
}

function sendNotFound(ctx : Context) {
    ctx.response.status = Status.NotFound,
    ctx.response.body = STATUS_TEXT.get(Status.NotFound);
}