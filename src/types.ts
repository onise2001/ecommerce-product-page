export interface IProduct {
  id: number;
  companyTitle: string;
  productTitle: string;
  productDescription: string;
  price: number;
  salePercentage: number;
  images: Array<string>;
}

export interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
}
