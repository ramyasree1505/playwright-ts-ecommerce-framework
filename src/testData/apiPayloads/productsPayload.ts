type productsPayload = {
    productName: string;
    minPrice: number | null;
    maxPrice: number | null;
    productCategory: string [];
    productSubCategory: string [];
    productFor: string []
};

export const productsPayLoad : productsPayload = { 
    productName: "",
    minPrice: null,
    maxPrice: null,
    productCategory: [],
    productSubCategory: [],
    productFor: []
};