export interface IProducts {
  id: string;
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
  id: string;
  name: string;
  hierarchy: string;
  email: string;
  password: string;
  cart: Array<Icart>;
}
