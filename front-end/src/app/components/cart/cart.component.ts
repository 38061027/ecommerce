import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: IProducts[];
  totalValue:number = 0;
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.service.getCart().subscribe((res: IProducts[]) => {
      this.cart = res,
      this.totalValue = res.reduce((a,b)=>a+b.price,0)
    });
  }

  incrementQuantity(item: IProducts) {
    item.quantity++;
    this.service.updateQuantity(item.id, item.quantity).subscribe();
  }
  decremetQuantity(item: IProducts) {
    if (item.quantity > 1) {
      item.quantity--;
      this.service.updateQuantity(item.id, item.quantity).subscribe();
    }
  }
  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe(() => this.getCart());
  }
}
