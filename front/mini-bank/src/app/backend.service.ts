import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './usermodels.model';
import { Transaction } from './transaction.model';
import { Branch } from './miscmodels.models';
@Injectable({
  providedIn: 'root'
})
export class minibankService{
  private url = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  private user : User | null = null;



  performTransaction(transaction: Transaction): Observable<Transaction> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Transaction>(this.url + "/transactions", transaction, httpOptions);
  }
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
  setUser(user: User){
    this.user = user;
  }
  getUser(){return this.user}
  getPlaces(){return this.http.get<Branch[]>(this.url + "/places")}
}