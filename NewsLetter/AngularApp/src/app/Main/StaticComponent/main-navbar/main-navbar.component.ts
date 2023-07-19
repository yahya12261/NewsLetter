import { ApiService } from './../../../Auth/Auth-Services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent implements OnInit {
  isMenuCollapsed = true;
  constructor(private router: Router, private ApiService: ApiService) {}
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
    this.ApiService.setLoggedIn(false);
  }
  ngOnInit(): void {}
}
