import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces/app.interface';
import { BehaviorSubject } from 'rxjs';
const AUTH_API = 'http://localhost:8081/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  loggenIn$ = new BehaviorSubject(false);
  constructor(private http: HttpClient) {
    if (this.hasToken()) {
      this.setLoggedIn(true);
    } else {
      this.setLoggedIn(false);
    }
  }
  setLoggedIn(value: boolean) {
    //update loggedin status in loggedIn$ stream.
    this.loggenIn$.next(value);
  }
  formData = new FormData();
  hasToken(): boolean {
    //chack user has a token
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  login(user: User): Observable<any> {
    this.formData.set('Email', user.Email + '');
    this.formData.set('Pass', user.Pass + '');
    this.formData.set('First', '');
    this.formData.set('Middle', '');
    this.formData.set('Last', '');
    this.formData.set('Dob', '');
    //
    return this.http.post(AUTH_API + 'SignIn', this.formData);
  }

  register(user: User): Observable<any> {
    this.formData.set('Email', user.Email + '');
    this.formData.set('Pass', user.Pass + '');
    this.formData.set('First', user.First + '');
    this.formData.set('Middle', user.Middle + '');
    this.formData.set('Last', user.Last + '');
    this.formData.set('Dob', user.Dob + '');

    return this.http.post(AUTH_API + 'SignUp', this.formData);
  }
}
