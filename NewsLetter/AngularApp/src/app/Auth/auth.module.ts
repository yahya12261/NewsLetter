import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './Component/auth/auth.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { LoginFormComponent } from './Component/login-form/login-form.component';
import { RegistratonFormComponent } from './Component/registraton-form/registraton-form.component';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FocusMessageDirective } from './Auth-Services/Directives/focus-message.directive';
import { RaccountActivationPopupComponent } from './Popups/raccount-activation-popup/raccount-activation-popup.component';
import { ApiService } from './Auth-Services/api.service';
import { AuthGuard } from './Auth-Services/auth.guard';

@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoginFormComponent,
    RegistratonFormComponent,
    FocusMessageDirective,
    RaccountActivationPopupComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgxCaptchaModule,
    FormsModule,
  ],
  providers: [ApiService, AuthGuard],
})
export class AuthModule {}
