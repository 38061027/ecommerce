import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/core/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
id!:number | null;
product!:IProducts | undefined;
constructor(private activatedRoute: ActivatedRoute,private service: SharedService){}

ngOnInit(): void {
  this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
  if(this.id){
    this.service.getProducts().subscribe((product:IProducts[])=>{
      const p = product.find(p=>p.id == this.id)
      this.product = p
    })
  }
  console.log(this.id)
}

}
