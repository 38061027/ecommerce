import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formState = new BehaviorSubject<any>([]);
  formState$ = this.formState.asObservable();

  constructor(private http: HttpClient) {}

  getStateForm(form: any) {
    this.formState.next(form);
  }
}
