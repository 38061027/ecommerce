export interface IProducts {
  id: number;
  name: string;
  quantity: number;
  description: string;
  price: number;
  status: number;
}
export interface Icart {
  productName: string;
  productId: string;
  quantity: number;
  totalValue: number;
}
export interface IUsers {
  id: number;
  name: string;
  hierarchy: string;
  email: string;
  password: string;
  cart: Array<Icart>;
}
