type orderPayload = {
    orders: {
    country: string;
    productOrderedId: string;
    }[];
};

export const orderPayLoad : orderPayload = { 
    orders:
    [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
