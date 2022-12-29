import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import apiData from './../../../assets/http_config.json';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    })
    return this.http
      .get<any[]>(apiData.vehicles.get_vehicles.url, { headers: headers });
  }
}
