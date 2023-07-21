import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {
  loggedInStatus: boolean = false;

  constructor(private auth: ApiService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.auth.loggenIn$.subscribe((status) => {
      this.loggedInStatus = status;
    });

    return this.loggedInStatus;
  }
}
