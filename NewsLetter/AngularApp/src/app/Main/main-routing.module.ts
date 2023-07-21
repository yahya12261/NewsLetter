import { AppComponent } from './app/app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../Auth/Auth-Services/auth.guard';
import { HomeComponent } from './Component/home/home.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { AddPostComponent } from './Component/add-post/add-post.component';
const routes: Routes = [
  {
    path: 'Main',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'AddPost', component: AddPostComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
