
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './usermodels.model';
@Injectable({
  providedIn: 'root'
})
export class minibankService{
  private url = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  login(user_code: string, password: string): Observable<User> {
    const body = {
      user_code: user_code,
      password: password
    };
    console.log(body);

    // Definir los encabezados para indicar que se envían datos JSON
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Hacer la solicitud HTTP POST con los encabezados
    return this.http.post<User>(this.url + "/user/login", body, httpOptions);
  }
}
