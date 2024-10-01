import { Component, OnInit } from '@angular/core';
import { Icart } from 'src/app/core/interface/interface.';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Icart[];
  totalValue: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((res: Icart[]) => {
      this.cart = res;
      this.totalValue = this.totalCartValue(res);
    });
  }

  totalCartValue(values: Icart[]) {
    return values.reduce((a: any, b: any) => a + b.totalValue, 0);
  }

  incrementQuantity(item: Icart) {
    item.quantity++;
    this.totalValue += item.quantity * this.totalValue;
    this.cartService.updateQuantity(item.productId, item.quantity, item).subscribe();
  }

  // TENHO QUE PEGAR O PRODUCT ID E FILTRAR E ATULIZAR O PRODUTO ESPECIFICO

  decremetQuantity(item: Icart) {
    if (item.quantity > 1) {
      item.quantity--;
      // this.cartService.updateQuantity(item.id, item.quantity).subscribe();
    }
  }
  deleteCart(id: string) {
    // this.cartService.deleteCart(id).subscribe(() => this.getCart());
  }
}
