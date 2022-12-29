import { Injectable } from '@angular/core';
import apiData from './../../assets/http_config.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  headers = new Headers();
  profile = {
    "id": "", "name": "", "email": "", "created_at": "", "updated_at": ""
  };
  token = "";

  constructor() { }
  isAuthenticated() {

    let token = (localStorage.getItem('token') == null) ? "" : localStorage.getItem('token');
    this.isLoggedIn = (token!.length > 0);
    this.token = (token!.length > 0) ? token! : "";

    let profile = (localStorage.getItem('profile') == null) ? '{"id": "", "name": "", "email": "", "created_at": "", "updated_at": ""}' : localStorage.getItem('profile');
    this.profile = JSON.parse(profile!);

    return this.isLoggedIn;
  }

  authenticate(username: string, password: string) {

    this.headers.append("Accept", "application/json");
    this.headers.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", username);
    urlencoded.append("password", password);

    let requestOptions = {
      method: apiData.auth.login.method,
      headers: this.headers,
      body: urlencoded,
      // redirect: 'follow'
    };

    fetch(apiData.auth.login.url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        this.isAuthenticated();
      });
  }

  getProfile() {
    this.headers.append("Accept", "application/json");
    this.headers.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();

    let requestOptions: { [k: string]: any } = {};
    requestOptions = {
      method: apiData.auth.user.method,
      headers: this.headers,
      // redirect: 'follow'
    };

    if (apiData.auth.user.method != "GET") {
      requestOptions['body'] = urlencoded;
    }

    if (this.isLoggedIn) {
      this.headers.append("Authorization", "Bearer " + this.token);
      requestOptions['headers'] = this.headers;
    }

    fetch(apiData.auth.user.url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("profile", JSON.stringify(response));
      });
  }
}
