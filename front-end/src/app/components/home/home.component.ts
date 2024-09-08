import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  counterCart:number = 0;
  products!:IProducts[];


constructor(private service: SharedService){}

  ngOnInit(): void {
    this.getProducts();
    this.service.getCart().subscribe(res => this.counterCart = res.length)
  }
  getProducts(){
    return this.service.getProducts().subscribe(res => this.products = res)
  }
  
}
