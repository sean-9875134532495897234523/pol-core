import {
    Bson
  } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

interface BaseSchema {
    "_id": Bson.ObjectId;
    "created": Date;
}

interface Metadata {
    "metadata": Record<string, unknown>;
}

export interface CustomerSchema extends BaseSchema, Metadata {
    "first_name": string;
    "last_name": string;
}

export interface FullCustomerSchema extends CustomerSchema {
    "sources": SourceSchema[];
}

export interface SourceSchema extends BaseSchema, Metadata {
    "customer_id": Bson.ObjectId;
    "provider": ProviderSchema;
    "currency": string;
    "additional_customer_fields": Record<string, unknown>;
    "provider_identifiers": Record<string, unknown>;
    "status": string;
}

export interface ProviderSchema extends BaseSchema {
    "name": string;
    "payment_method": string;
    "status": string;
}