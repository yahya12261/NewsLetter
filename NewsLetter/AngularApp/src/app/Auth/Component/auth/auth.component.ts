import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  private isPageReloaded = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // if (!this.isPageReloaded) {
    //   location.reload();
    //   this.isPageReloaded = true;
    // }
  }
}
