import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap } from 'rxjs';
import { Icart, IProducts } from 'src/app/core/interface/interface.';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private apiUrlCart: string = 'http://localhost:3000/api/cart';
  // private apiUrlCart: string = 'http://localhost:3000/users';
  private apiUrlCart: string = 'http://localhost:3000/cart';

  private counterCart = new BehaviorSubject<number>(0);
  counterCart$ = this.counterCart.asObservable();
  private cart = new BehaviorSubject<Icart[]>([]);
  cart$ = this.cart.asObservable();

  userString = localStorage.getItem('user');
  actualUserId!: string;
  actualCart: any;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {
    if (this.userString) {
      this.actualUserId = JSON.parse(this.userString).id;
    }
    this.getProducts();
    // this.getCartByUser();
    this.cart$.subscribe();
    this.getCart().subscribe((res) =>
      res.map((el: any) => {
      this.counterCart.next(res.length),
      this.cart.next(res),
        this.actualCart = el.cart;
      })
    );
  }

  setCounterCart(counter: number) {
    this.counterCart.next(counter);
  }
  // getCartByUser(): void {
  //   this.http.get<any>(this.apiUrlCart).subscribe((res) => {
  //     const user = res.find((u: any) => String(u.id) === this.actualUserId);
  //     if (user) {
  //       this.cart.next(user.cart);
  //       this.counterCart.next(user.cart.length);
  //     }
  //   });
  // }

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrlCart);
  }
 
    sendToCart(product: Icart): Observable<IProducts> {
    return this.http.post<IProducts>(this.apiUrlCart, product);
  }


  updateQuantity(
    productId: string,
    newQuantity: number,
    item: Icart
  ): Observable<any> {
    return this.http.patch(`${this.apiUrlCart}/7b42`, {
      cart: 
        {
          productId: item.productId,
          productName: item.productName,
          quantity: newQuantity,
          totalValue: item.totalValue,
        },
      
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      res.forEach((el) => console.log(el.price));
    });
  }

  // updateQuantity(
  //   productId: string,
  //   newQuantity: number,
  //   item: Icart
  // ): Observable<any> {
  //   return this.productsService.getProducts().pipe(
  //     map((res) => res.find((product) => product.id === productId)),
  //     switchMap((product) => {
  //       if (!product) {
  //         throw new Error('Produto não encontrado');
  //       }

  //       const updatedCart = this.actualCart.map((cartItem: Icart) => {
  //         if (cartItem.productId === productId) {
  //           return {
  //             ...cartItem,
  //             quantity: newQuantity,
  //             totalValue: newQuantity * product.price,
  //           };
  //         }
  //         return cartItem;
  //       });

  //       return this.http
  //         .patch(`${this.apiUrlCart}/${this.actualUserId}`, {
  //           cart: updatedCart,
  //         })
  //         .pipe(
  //           map((res) => {
  //             this.cart.next(updatedCart);
  //             return res;
  //           })
  //         );
  //     })
  //   );
  // }

  // deleteCart(id: number): Observable<IProducts> {
  //   return this.http.delete<IProducts>(`${this.apiUrlCart}/${id}`);
  // }
}
