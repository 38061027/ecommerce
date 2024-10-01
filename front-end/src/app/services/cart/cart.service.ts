import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Icart, IProducts } from 'src/app/core/interface/interface.';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class CartService{
  // private apiUrlCart: string = 'http://localhost:3000/api/cart';
  private apiUrlCart: string = 'http://localhost:3000/users';
  private counterCart = new BehaviorSubject<number>(0);
  counterCart$ = this.counterCart.asObservable();
  private cart = new BehaviorSubject<Icart[]>([]);
  cart$ = this.cart.asObservable();

  userString = localStorage.getItem('user');
  actualUserId!: string;
  actualCart: any

  constructor(private http: HttpClient, private usersService: UsersService) {
    if (this.userString) {
      this.actualUserId = JSON.parse(this.userString).id;
    }

    this.getCart();
    this.cart$.subscribe();
    this.testCart().subscribe(res => res.map((el:any) => this.actualCart = el.cart))

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

  testCart():Observable<any>{
    return this.http.get<any>(this.apiUrlCart)
  }

  sendToCart(product: IProducts): Observable<IProducts> {
    let updateCart = [...this.actualCart, product]
    this.http.get<any>(`${this.apiUrlCart}/1`).subscribe(res => console.log(res))

    return this.http.patch<IProducts>(`${this.apiUrlCart}/1`, {cart:updateCart}).pipe(
      switchMap(() => this.testCart())
    );;
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