export interface IProduct {
  id: string;
  cant: number;
  images: string;
  price: number;
  ref: string;
  active: boolean;
}
export interface IItems {
  category: string;
  active: boolean;
  products: IProduct[];
}
