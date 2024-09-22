import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from 'src/app/core/interface/interface.';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private apiUrlUser: string = 'http://localhost:3000/api/users';
  private apiUrlUser: string = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  
  registerUser(user: IUsers): Observable<IUsers> {
    return this.http.post<IUsers>(this.apiUrlUser, user);
  }

  getUser(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.apiUrlUser);
  }

  deleteUser(id: number): Observable<IUsers> {
    return this.http.delete<IUsers>(`${this.apiUrlUser}/${id}`);
  }

  editUser(id:number, user: IUsers):Observable<IUsers>{
    return this.http.patch<IUsers>(`${this.apiUrlUser}/${id}`, {name: user.name, hierarchy: user.hierarchy})
  }
}
