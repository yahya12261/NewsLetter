import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MainRoutingModule } from './main-routing.module';
import { AppComponent } from './app/app.component';
import { AsidebarComponent } from './StaticComponent/asidebar/asidebar.component';
import { HomeComponent } from './Component/home/home.component';
import { MainNavbarComponent } from './StaticComponent/main-navbar/main-navbar.component';
import { SearchBarComponent } from './Component/search-bar/search-bar.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPostComponent } from './Component/add-post/add-post.component';
import { SearchFilterPipe } from '../../app/Main/Pipes/search-filter-fulliteam.pipe';
import { RouterModule } from '@angular/router';
import { PostComponent } from './Component/post/post.component';
import { ChangeProfilePhotoComponent } from './Popups/change-profile-photo/change-profile-photo.component';
import { ChangePasswordComponent } from './Popups/change-password/change-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderBy } from './Pipes/orderBy';
// import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    AsidebarComponent,
    HomeComponent,
    MainNavbarComponent,
    SearchBarComponent,
    ProfileComponent,
    AddPostComponent,
    SearchFilterPipe,
    PostComponent,
    ChangeProfilePhotoComponent,
    ChangePasswordComponent,
    OrderBy,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    ReactiveFormsModule,
    MainRoutingModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MainModule {}
