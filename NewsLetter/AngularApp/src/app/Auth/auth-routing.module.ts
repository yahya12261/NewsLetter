import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './Auth-Services/auth.guard';
import { AuthComponent } from './Component/auth/auth.component';
import { LoginFormComponent } from './Component/login-form/login-form.component';
import { RegistratonFormComponent } from './Component/registraton-form/registraton-form.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'Registration', component: RegistratonFormComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
