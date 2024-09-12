import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducts } from 'src/app/core/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  productRegister:FormGroup;

    constructor(private service:SharedService, private fb: FormBuilder){
      this.productRegister = this.fb.group({
        name:['',Validators.required],
        quantity:['',Validators.required],
        description:['',Validators.required],
        price:['',Validators.required],
        status:['',Validators.required]
      })
    }

    sendProduct(){
      if(this.productRegister.valid){
        const product = this.productRegister.value;
        console.log(product)
        this.service.sendProducts(product).subscribe()
      }
    }

}
