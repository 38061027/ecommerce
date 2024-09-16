import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducts } from 'src/app/core/interface/interface.';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  productRegister:FormGroup;

    constructor(private productsService:ProductsService, private fb: FormBuilder){
      this.productRegister = fb.group({
        name: ['', Validators.maxLength(20)],
        quantity: ['', Validators.min(1)],
        description: ['', Validators.maxLength(50)],
        price: ['', Validators.required],
        status: ['', Validators.min(1)],
      });
    }

    sendProduct(){
      if(this.productRegister.valid){
        const product = this.productRegister.value;
        console.log(product)
        this.productsService.sendProducts(product).subscribe()
      }
    }
    

}
