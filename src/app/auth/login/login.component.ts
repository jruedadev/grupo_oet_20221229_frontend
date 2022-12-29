import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['profile']);
    }
  }

  username = '';
  password = '';

  authenticate() {
    this.authService.authenticate(this.username, this.password);
  }
}
