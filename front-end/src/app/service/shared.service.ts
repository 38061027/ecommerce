import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { IProducts } from '../interface/interface.';

@Injectable({
  providedIn: 'root',
})
export class SharedService{
  apiUrlData: string = 'http://localhost:3000/api/data';
  apiUrlCart: string = 'http://localhost:3000/api/cart';
  urlJsonServer: string = 'http://localhost:3000/products';
   private counterCart = new BehaviorSubject<number>(0);
   counterCart$ = this.counterCart.asObservable();

  constructor(private http: HttpClient) {
    this.getCart().subscribe(res => this.counterCart.next(res.length))
  }

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrlData);
  }


  sendProducts(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(`${this.apiUrlData}`, product);
  }

  getCart(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrlCart)
  }

  sendToCart(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.apiUrlCart, product)
  }
  updateQuantity(id: number, newQuantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrlCart}/${id}`, {
      quantity: newQuantity,
    });
  }
  deleteCart(id: number): Observable<IProducts> {
    return this.http.delete<IProducts>(`${this.apiUrlCart}/${id}`);
  }

}
