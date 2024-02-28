import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './usermodels.model';
import { Transaction } from './transaction.model';
import { Branch } from './miscmodels.models';
import { FormGroup } from '@angular/forms';
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
    return this.http.post<Transaction>(this.url + "/transaction", transaction, httpOptions);
  }
  login(user_code: string, password: string): Observable<User> {
    const body = {
      user_code: user_code,
      password: password
    };


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


  updateUser(user:any): Observable<User> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const user_data = {
      user_code: this.user?.user_code,
      password: this.user?.hashed_password,
      fields: [
        { names: user.name },
        { lastnames: user.lastnames },
        { nationality: user.nationality },
      ]
    };



    return this.http.put<User>(`${this.url}/user/update`, user_data, httpOptions)

  }

 
  getTransactionsMadeByUser(userId: string): Observable<Transaction[]> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<Transaction[]>(`${this.url}/transaction/usermade`, { params });
  }

  getTransactionsReceivedByUser(userId: string): Observable<Transaction[]> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<Transaction[]>(`${this.url}/transaction/usergot`, { params });
  }


  addPhoneNumber(phoneData: { user_code: string, password: string, new_phone: { number: number, postal_code: string, brand: string } }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       
      })
    };


    const url = `${this.url}/user/phone`;
    
    // Realiza la petición POST con los datos del teléfono.
    return this.http.post(url, phoneData, httpOptions);
  }



  addAddress(addressData: { user_code: string; password: string; new_address: { street_name: string; zip_code: string; city: string; } }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    const url = `${this.url}/user/address`;
  
    // Realiza la petición POST con los datos de la dirección.
    return this.http.post(url, addressData, httpOptions);
  }


  createLoan(loanData: { userId: string, amount: number, due_date: string, currency: string, interest: number, interest_rate: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    const url = `${this.url}/transaction/loans`;
    
    // Realiza la petición POST con los datos del préstamo.
    return this.http.post(url, loanData, httpOptions);
  }
  
  
}
  


