import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      hierarchy: ['', Validators.minLength(4)],
      email: ['', Validators.minLength(5)],
      password: ['', Validators.minLength(6)],
    });
  }

  ngOnInit(): void {
    this.service.formState$.subscribe((res) => console.log(res));
  }

  getStateForm(form: any) {
    this.service.getStateForm(form);
  }

  onSubmit() {
    if (this.login.valid) {
      const user = this.login.value;
      this.service.sendUser(user).subscribe();
      this.getStateForm(user);
      this.router.navigate(['home']);
    }
  }
}
