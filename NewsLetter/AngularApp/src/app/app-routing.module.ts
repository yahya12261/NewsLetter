import { AppComponent } from './Main/app/app.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/Auth-Services/auth.guard';
const routes: Routes = [
  // { path: 'home', component: MainComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./Auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'Main',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Main/main.module').then((m) => m.MainModule),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
