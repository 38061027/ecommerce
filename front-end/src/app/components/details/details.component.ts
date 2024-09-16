import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/core/interface/interface.';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
id!:number | null;
product!:IProducts | undefined;
constructor(private activatedRoute: ActivatedRoute,private productsService: ProductsService){}

ngOnInit(): void {
  this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
  if(this.id){
    this.productsService.getProducts().subscribe((product:IProducts[])=>{
      const p = product.find(p=>p.id == this.id)
      this.product = p
    })
  }
  console.log(this.id)
}

}
