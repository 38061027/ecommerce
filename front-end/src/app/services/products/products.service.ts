import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from 'src/app/core/interface/interface.';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrlData: string = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) { }

  
  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrlData);
  }
  sendProducts(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(`${this.apiUrlData}`, product);
  }

}
