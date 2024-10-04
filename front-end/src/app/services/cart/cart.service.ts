import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
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
  actualCart: any;

  constructor(private http: HttpClient, private usersService: UsersService) {
    if (this.userString) {
      this.actualUserId = JSON.parse(this.userString).id;
    }

    this.getCartByUser();
    this.cart$.subscribe();
    this.getCart().subscribe((res) =>
      res.map((el: any) => {
        this.actualCart = el.cart;
      })
    );
  }

  setCounterCart(counter: number) {
    this.counterCart.next(counter);
  }
  getCartByUser(): void {
    this.http.get<any>(this.apiUrlCart).subscribe((res) => {
      const user = res.find((u: any) => String(u.id) === this.actualUserId);
      if (user) {
        this.cart.next(user.cart);
        this.counterCart.next(user.cart.length);
      }
    });
  }

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrlCart);
  }
  sendToCart(product: Icart): Observable<Icart> {
    let updateCart = [...this.actualCart, product];

    return this.http
      .patch<Icart>(`${this.apiUrlCart}/${this.actualUserId}`, { cart: updateCart })
      .pipe(
        switchMap(() => this.getCart()),
        map((res) => {
          const user = res.find((u: any) => String(u.id) === this.actualUserId);
          if (user) {
            this.actualCart = user.cart;
            this.cart.next(this.actualCart);
            this.counterCart.next(this.actualCart.length);
          }
          return product;
        })
      );
  }

  updateQuantity(
    id: string,
    newQuantity: number,
    item: Icart
  ): Observable<any> {
    return this.http.patch(`${this.apiUrlCart}/${id}`, {
      cart: [
        {
          productId: item.productId,
          productName: item.productName,
          quantity: newQuantity,
          totalValue: item.totalValue,
        },
      ],
    });
  }

  // deleteCart(id: number): Observable<IProducts> {
  //   return this.http.delete<IProducts>(`${this.apiUrlCart}/${id}`);
  // }
}
