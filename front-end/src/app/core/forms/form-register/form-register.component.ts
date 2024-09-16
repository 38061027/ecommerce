import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from '../../interface/interface.';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  registerUser: FormGroup;
  userString = localStorage.getItem('user');
  userStr: string = '';

  c: any[] = [
    { hierarchy: 'admin' },
    { hierarchy: 'cliente' }
  ];
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.registerUser = fb.group({
      name: ['', Validators.minLength(4)],
      hierarchy: ['', Validators.minLength(4)],
      email: ['', Validators.minLength(5)],
      password: ['', Validators.minLength(6)],
    });

    if(this.userString){
      const user:IUsers = JSON.parse(this.userString)
      this.userStr = user.name;
    }
  }

  onRegister() {
    if (this.registerUser.valid) {
      const newUser = this.registerUser.value;
      this.usersService.registerUser(newUser).subscribe();
      localStorage.setItem('user', JSON.stringify(newUser))
      this.router.navigate(['home']);
    }
  }
}
