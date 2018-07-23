import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '../../environments/environment';

/*
  Generated class for the AuthProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  login_url = ENV.site_url + ENV.login_url;
  register_url = ENV.site_url + ENV.register_url;
  reset_password_url = ENV.site_url + ENV.reset_password_url;


  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  postLogin(username, password) {
    let data = {
      username: username,
      password: password
    };

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.login_url, data, { headers: headers });
  }

  register(username, email, password) {
    let data = {
      username: username,
      email: email,
      password: password
    };

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.register_url, data, { headers: headers });
  }
  reset_password(username) {
    let data = {
      username: username
    };
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.reset_password_url, data, { headers: headers });
  }

}
