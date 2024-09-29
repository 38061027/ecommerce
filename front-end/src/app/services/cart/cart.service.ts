import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Icart, IProducts } from 'src/app/core/interface/interface.';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private apiUrlCart: string = 'http://localhost:3000/api/cart';
  private apiUrlCart: string = 'http://localhost:3000/users';
  private counterCart = new BehaviorSubject<number>(0);
  counterCart$ = this.counterCart.asObservable();
  private cart = new BehaviorSubject<Icart[]>([]);
  cart$ = this.cart.asObservable();

  userString = localStorage.getItem('user');
  actualUserId!: string;

  constructor(private http: HttpClient, private usersService: UsersService) {
    if (this.userString) {
      this.actualUserId = JSON.parse(this.userString).id;
    }

    this.getCart();
    this.cart$.subscribe();
  }

  setCounterCart(counter: number) {
    this.counterCart.next(counter);
  }
  getCart(): void {
    this.http.get<any>(this.apiUrlCart).subscribe((res) => {
      const user = res.find((u: any) => String(u.id) === this.actualUserId);
      if (user) {
        this.cart.next(user.cart);
        this.counterCart.next(user.cart.length);
      }
    });
  }

  // sendToCart(product: IProducts): Observable<IProducts> {
  //   return this.http.post<IProducts>(this.apiUrlCart, product);
  // }
  // updateQuantity(id: number, newQuantity: number): Observable<any> {
  //   return this.http.patch(`${this.apiUrlCart}/${id}`, {
  //     quantity: newQuantity,
  //   });
  // }
  // deleteCart(id: number): Observable<IProducts> {
  //   return this.http.delete<IProducts>(`${this.apiUrlCart}/${id}`);
  // }
}
