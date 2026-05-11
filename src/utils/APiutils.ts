import { APIRequestContext, request } from '@playwright/test';

// Interface for Login Payload
interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

// Interface for Products Payload
interface ProductsPayload {
    productName: string;
    minPrice: number | null;
    maxPrice: number | null;
    productCategory: string [];
    productSubCategory: string [];
    productFor: string []
}

// Interface for Create Order Payload
interface OrderPayload {
  orders: {
    country: string;
    productOrderedId: string;
  }[];
}

// Interface for Response Object
interface CreateOrderResponse {
  token: string;
  orderId: string;
}

// Interface for Response Object
interface GetProductResponse {
  token: string;
  productId: string;
}

export class ApiUtils {
    apiContext: APIRequestContext;
    loginPayLoad: LoginPayload;
    productsPayload :ProductsPayload;

    constructor(apiContext : APIRequestContext, loginPayLoad: LoginPayload, productsPayload: ProductsPayload) {
        this.apiContext  = apiContext;
        this.loginPayLoad = loginPayLoad;
        this.productsPayload = productsPayload;
    }
 
    async getToken(): Promise<string>  {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token : string = loginResponseJson.token;
        console.log(token);
        return token;
    }
 
    async getProductIds(productsPayload: ProductsPayload): Promise<string>  {
        const response: GetProductResponse = {
            token: '',
            productId: ''
        };
        response.token = await this.getToken();

        const getProductsResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products", {
            data: productsPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        }); // 200, 201
        const getProductsResponseJson = await getProductsResponse.json();
        const productIds : string = getProductsResponseJson.data.find((product: any) => 
            product.productName === "ADIDAS ORIGINAL")._id;
        response.productId = productIds;
        return response.productId;
    }
 
    async createOrder(orderPayLoad : OrderPayload) : Promise<CreateOrderResponse> {
        const response: CreateOrderResponse = {
            token: '',
            orderId: ''
        };
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
 
        return response;
    }
}
