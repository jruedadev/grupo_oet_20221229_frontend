import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = {
    "id": "",
    "email": "",
    "name": "",
    "created_at": "",
    "updated_at": "",
  }
  constructor(private router: Router, private authService: AuthService) {
    this.authService.getProfile();
  }

  ngOnInit(): void {
    this.profile = this.authService.profile;
  }
}
