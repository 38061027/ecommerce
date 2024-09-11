import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
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
  active: boolean = false;
  model: any;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.service.counterCart$.subscribe((res) => (this.counterCart = res));
    this.getProducts();
  }
  cartActive() {
    if (!this.active) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.products
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
              .map((product) => product.name)
      )
    );
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
        this.service.sendToCart(product).subscribe((res: IProducts) => {
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
