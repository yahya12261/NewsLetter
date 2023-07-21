import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServicesService } from '../../Services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private api: ApiServicesService,
    private spinner: NgxSpinnerService
  ) {}
  oldPassword = '';
  newPassword1 = '';
  newPassword2 = '';
  ErrorMsg = '';
  ngOnInit(): void {}
  onSubmit() {
    this.spinner.show();
    if (this.newPassword1 == this.newPassword2) {
      if (this.newPassword1.length > 7) {
        let formData = new FormData();

        this.api.changePassword(this.oldPassword, this.newPassword1).subscribe({
          next: (data) => {
            this.oldPassword = '';
            this.newPassword1 = '';
            this.newPassword2 = '';
            this.spinner.hide();
            this.activeModal.close();
          },
          error: (err) => {
            this.spinner.hide();
            this.ErrorMsg = err.msg;
          },
        });
      } else {
        this.spinner.hide();
        this.ErrorMsg = 'The new Passwords is Small!';
      }
    } else {
      this.spinner.hide();
      this.ErrorMsg = 'The new Passwords is Not Compatible!';
    }
  }
  onChangeInput() {
    this.ErrorMsg = '';
  }
}
