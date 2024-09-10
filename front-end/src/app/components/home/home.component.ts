import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  counterCart: number = 0;
  products!: IProducts[];
  existingMsg: boolean = false;
  insertToCart: boolean = false;
  active:boolean = false;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getProducts();
    this.service.getCart().subscribe((res) => (this.counterCart = res.length));
  }
  cartActive(){
    this.active = true
  }
  getProducts() {
    return this.service.getProducts().subscribe((res) => (this.products = res));
  }
  sendToCart(product: IProducts) {
    this.service.getCart().subscribe((res: IProducts[]) => {
      const existing = res.some((el) => el.id === product.id);

      if (existing) {
        this.existingMsg = true;
        setTimeout(() => {
          this.existingMsg = false;
        }, 2500);
      } else {
        product.quantity = 1;
        this.service.sendToCart(product).subscribe(() => {
          this.counterCart++;
          this.insertToCart = true;
          setTimeout(() => {
            this.insertToCart = false;
          }, 2500);
        });
      }
    });
  }
}
