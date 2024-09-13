import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/core/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private router: Router
  ) {
    this.login = fb.group({
      name: ['', Validators.minLength(4)],
      password: ['', Validators.minLength(6)],
    });
  }

  ngOnInit(): void {
    this.service.formState$.subscribe((res) => console.log(res));
  }

  getStateForm(form: any) {
    this.service.getStateForm(form);
  }

  validateLogin() {
    this.service.getUser().subscribe((user: IUsers[]) => {
      if (this.login.valid) {
        const logUser = this.login.value;
        const password = logUser.password;
        const name = logUser.name;
        user.forEach((e) => {
          if (e.password == password && e.name == name) {
            this.router.navigate(['home']);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.login.valid) {
      const user = this.login.value;
      this.getStateForm(user);
    }
  }
}
