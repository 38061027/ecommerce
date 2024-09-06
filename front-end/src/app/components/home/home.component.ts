import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  counterCart:number = 2;

  products:any[] = [
    {
      "id": 1,
      "name": "Apple iPhone 15",
      "quantity": 5,
      "description": "O iPhone 15 traz a Dynamic Island, câmera grande-angular de 48 MP e USB-C. Tudo em um vidro resistente colorido por infusão e design em alumínio.",
      "price": "4.750",
      "status": 1
    },
    {
      "id": 2,
      "name": "Apple iPhone 10",
      "quantity": 3,
      "description": "O iPhone 15 traz a Dynamic Island, câmera grande-angular de 48 MP e USB-C. Tudo em um vidro resistente colorido por infusão e design em alumínio.",
      "price": "4.750",
      "status": 1
    },
    {
      "id": 3,
      "name": "Apple iPhone 11",
      "quantity": 1,
      "description": "O iPhone 15 traz a Dynamic Island, câmera grande-angular de 48 MP e USB-C. Tudo em um vidro resistente colorido por infusão e design em alumínio.",
      "price": "4.750",
      "status": 0
    }
  ]
  
}
