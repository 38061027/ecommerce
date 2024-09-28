import { Component, OnInit } from '@angular/core';
import { Icart, IProducts, IUsers } from 'src/app/core/interface/interface.';
import { CartService } from 'src/app/services/cart/cart.service';
import { UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Icart[] = [];
  totalValue:number = 0;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.usersService.getUser().subscribe((res: IUsers[]) => {
      let productsInCart = res.map(el => el.cart)
      console.log(productsInCart)
      // this.cart.push()
      // this.totalValue = res.reduce((a,b)=>a+b.price*b.quantity,0)
    });
  }

  incrementQuantity(item: IProducts) {
    item.quantity++;
    this.totalValue+= item.quantity*this.totalValue
    // this.cartService.updateQuantity(item.id, item.quantity).subscribe();
  }
  decremetQuantity(item: IProducts) {
    if (item.quantity > 1) {
      item.quantity--;
      // this.cartService.updateQuantity(item.id, item.quantity).subscribe();
    }
  }
  deleteCart(id: number) {
    // this.cartService.deleteCart(id).subscribe(() => this.getCart());
  }
}
