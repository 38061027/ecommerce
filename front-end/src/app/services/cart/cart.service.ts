import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from 'src/app/core/interface/interface.';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrlCart: string = 'http://localhost:3000/api/cart';
    private counterCart = new BehaviorSubject<number>(0);
  counterCart$ = this.counterCart.asObservable();

  constructor(private http: HttpClient) { 
    this.getCart().subscribe((res) => this.counterCart.next(res.length));
  }
  getCart(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrlCart);
  }

  sendToCart(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.apiUrlCart, product);
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
