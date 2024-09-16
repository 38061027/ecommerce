import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/core/interface/interface.';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: IProducts[];
  totalValue:number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe((res: IProducts[]) => {
      this.cart = res,
      this.totalValue = res.reduce((a,b)=>a+b.price,0)
    });
  }

  incrementQuantity(item: IProducts) {
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity).subscribe();
  }
  decremetQuantity(item: IProducts) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity).subscribe();
    }
  }
  deleteCart(id: number) {
    this.cartService.deleteCart(id).subscribe(() => this.getCart());
  }
}
