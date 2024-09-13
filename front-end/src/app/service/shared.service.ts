import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { IProducts, IUsers } from '../core/interface/interface.';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiUrlData: string = 'http://localhost:3000/api/data';
  private apiUrlCart: string = 'http://localhost:3000/api/cart';
  private apiUrlUser: string = 'http://localhost:3000/api/user';
  private urlJsonServer: string = 'http://localhost:3000/products';
  private counterCart = new BehaviorSubject<number>(0);
  counterCart$ = this.counterCart.asObservable();

  private formState = new BehaviorSubject<any>([]);
  formState$ = this.formState.asObservable();

  constructor(private http: HttpClient) {
    this.getCart().subscribe((res) => this.counterCart.next(res.length));
  }

  getStateForm(form: any) {
    this.formState.next(form);
  }

  //Req do Products

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrlData);
  }
  sendProducts(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(`${this.apiUrlData}`, product);
  }

  //Req do Cart

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

  //Req do users

  registerUser(user: IUsers): Observable<IUsers> {
    return this.http.post<IUsers>(this.apiUrlUser, user);
  }

  getUser(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.apiUrlUser);
  }
}
