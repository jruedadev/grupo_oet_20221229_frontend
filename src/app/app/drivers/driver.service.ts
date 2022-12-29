import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import apiData from './../../../assets/http_config.json';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    })
    return this.http
      .get<any[]>(apiData.drivers.get_drivers.url, { headers: headers });
  }
}
