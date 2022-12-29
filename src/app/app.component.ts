import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit {
  title = 'Grupo OET - ACME';

  userLoggedIn = false;
  constructor(private authService: AuthService) { this.authService.isAuthenticated() }

  ngOnInit(): void {
    this.userLoggedIn = this.authService.isLoggedIn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userLoggedIn = this.authService.isLoggedIn;
  }
}
