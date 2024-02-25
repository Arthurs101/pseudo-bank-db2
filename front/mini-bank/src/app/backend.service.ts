
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './usermodels.model';
@Injectable({
  providedIn: 'root'
})
export class minibankService{
  private url = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  login(user_code: string, password: string):Observable<User>
  {
  const body = {
    user_code: user_code,
    password: password
  };
    return this.http.post<User>(this.url + "/user/login",body);
  }
}
