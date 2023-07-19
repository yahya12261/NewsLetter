import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Auth-Services/interfaces/app.interface';
import { ApiService } from '../../Auth-Services/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('Main');
    }
  }
  Email: String = '';
  Pass: String = '';
  ReadMe: boolean = false;
  errorMsg: String = '';
  user: User = {
    Email: '',
    Pass: '',
    First: '',
    Middle: '',
    Last: '',
    Dob: new Date(),
  };
  ngOnInit(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
  OnSubmit() {
    // this.router.navigateByUrl('Main/home');
    this.user.Email = this.Email;
    this.user.Pass = this.Pass + '';
    this.apiService.login(this.user).subscribe({
      next: (data) => {
        if (data.msg == 'Logged in!') {
          localStorage.setItem('token', data.token);

          // this.router.navigateByUrl('Main');
          this.apiService.setLoggedIn(true);
          window.location.reload();
        } else {
          this.errorMsg = data.msg;
        }
      },
      error: (err) => {
        this.errorMsg = 'This Email Or Password has Incorrect';
      },
    });
  }
  onDisable() {
    if (this.Email != '' && this.Pass != '') return false;
    return true;
  }
}
