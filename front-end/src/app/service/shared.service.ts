import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../interface/interface.';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  apiUrl = "http://localhost:3000/api/data"
  constructor(private http: HttpClient) { }


  getProducts():Observable<IProducts[]>{
    return this.http.get<IProducts[]>(this.apiUrl)
  }

  sendProducts(product:IProducts):Observable<IProducts>{
    return this.http.post<IProducts>(`${this.apiUrl}`, product)
  }

}
