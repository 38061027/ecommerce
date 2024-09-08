import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from '../interface/interface.';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiUrl: string = 'http://localhost:3000/api/data';
  urlJsonServer: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.urlJsonServer);
  }

  sendProducts(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(`${this.urlJsonServer}`, product);
  }

  getCart(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>('http://localhost:3000/cart');
  }

  updateQuantity(id: number, newQuantity: number): Observable<any> {
    return this.http.patch(`http://localhost:3000/cart/${id}`, { quantity: newQuantity });
  }
  
}
