import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProducts } from 'src/app/core/interface/interface.';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrlData: string = 'http://localhost:3000/api/data';
  private apiUrlData: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  
  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrlData);
  }
  sendProducts(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(`${this.apiUrlData}`, product);
  }
  searchProduct(term: string): Observable<IProducts[]> {
    const url = `http://localhost:3000/products`;  
    
    return this.http.get<IProducts[]>(url).pipe(
      map((products: IProducts[]) => 
        products.filter(product => product.name.toLowerCase().includes(term.toLowerCase())) 
      )
    );
  }
  

}
