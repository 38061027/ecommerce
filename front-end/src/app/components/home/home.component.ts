import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  counterCart:number = 2;
  products!:IProducts[];


constructor(private service: SharedService){}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    return this.service.getProducts().subscribe(res => this.products = res)
  }
  
}
