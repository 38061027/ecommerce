import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/core/interface/interface.';
import { SharedService } from 'src/app/service/shared.service';
interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: 'danger',
    message: 'Erro ao fazer log in, verifique seu nome ou senha!',
  },
];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('inputPass') inputPass!: ElementRef;

  login: FormGroup;
  alerts!: Alert[];
  msgError: boolean = false;
  userString = localStorage.getItem('user');

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private router: Router
  ) {
    this.login = fb.group({
      name: ['', Validators.minLength(4)],
      password: ['', Validators.minLength(6)],
    });
    this.reset();
    if (this.userString) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    // this.service.formState$.subscribe((res) => console.log(res));
  }

  togglePass(): void {
    if (this.inputPass.nativeElement.type === 'password') {
      this.inputPass.nativeElement.type = 'text';
    } else {
      this.inputPass.nativeElement.type = 'password';
    }
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
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
        user.forEach((e: IUsers) => {
          if (e.password == password && e.name == name) {
            localStorage.setItem('user', JSON.stringify(e));
            this.router.navigate(['home']);
          } else {
            this.msgError = true;
            setTimeout(() => {
              this.msgError = false;
            }, 4000);
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
