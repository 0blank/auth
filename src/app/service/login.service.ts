import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL = 'https://clienta-apigateway.azurewebsites.net/identity/login';
  // private readonly URL = 'https://clienta-reportservice.azurewebsites.net/report/getAllReports';

  constructor(private http:HttpClient) { }

  handleLogin(formData: LoginModel): Observable<any> {
    // const headers =  {
    //   headers: new  HttpHeaders({ 
    //     'Content-Type': 'application/x-www-form-urlencoded'})
    // };
    return this.http.post(this.URL,formData, {responseType: 'text'})
  }
}
