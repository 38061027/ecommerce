import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {

  registerUser:FormGroup

    constructor(private fb: FormBuilder, private service: SharedService){
      this.registerUser = fb.group({
        name: ['', Validators.minLength(4)],
        hierarchy: ['', Validators.minLength(4)],
        email: ['', Validators.minLength(5)],
        password: ['', Validators.minLength(6)],
      });
    }

    onRegister(){
      if(this.registerUser.valid){
        const newUser = this.registerUser.value
        this.service.registerUser(newUser).subscribe()
      }
    }


}
