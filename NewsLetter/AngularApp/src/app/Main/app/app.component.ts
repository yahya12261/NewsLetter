import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit(): void {
    this.showSpinner();
  }

  showSpinner() {
    this.spinner.show();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.startsWith('/Main')) {
          this.spinner.show();
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/Main')) {
          this.spinner.hide();
        }
      }
    });
  }
}
