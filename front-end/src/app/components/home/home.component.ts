import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  OperatorFunction,
  switchMap,
} from 'rxjs';
import { IProducts, IUsers } from 'src/app/core/interface/interface.';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

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
  userString = localStorage.getItem('user');
  userStr: string = '';
  productSelect!: IProducts;
  inputSearch = new FormControl('');

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private router: Router
  ) {
    if (this.userString) {
      const user: IUsers = JSON.parse(this.userString);
      this.userStr = user.name;
    }
  }

  ngOnInit(): void {
    this.cartService.counterCart$.subscribe((res) => (this.counterCart = res));
    this.getProducts();
    this.inputSearch.valueChanges.pipe(debounceTime(900)).subscribe((resp) => {
      if (resp) {
        this.productsService.searchProduct(resp).subscribe((res) => {
          this.products = res;
        });
      }
    });
  }
  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
  goToMenager() {
    if (this.userString) {
      const user: IUsers = JSON.parse(this.userString);
      this.userStr = user.name;
      this.router.navigate(['/menager'], {
        queryParams: { hierarchy: user.hierarchy, password: user.password },
      });
    }
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
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((term) =>
        term.length < 2
          ? of([])
          : this.productsService
              .searchProduct(term)
              .pipe(
                map((products) =>
                  products.slice(0, 3).map((product) => product.name)
                )
              )
      )
    );

  getProducts() {
    return this.productsService
      .getProducts()
      .subscribe((res) => (this.products = res));
  }
  sendToCart(product: IProducts) {
    this.cartService.getCart().subscribe((res: IProducts[]) => {
      const existing = res.some((el) => el.id === product.id);

      if (existing) {
        this.existingMsg = true;
        setTimeout(() => {
          this.existingMsg = false;
        }, 2500);
      } else {
        product.quantity = 1;
        this.cartService.sendToCart(product).subscribe((res: IProducts) => {
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
