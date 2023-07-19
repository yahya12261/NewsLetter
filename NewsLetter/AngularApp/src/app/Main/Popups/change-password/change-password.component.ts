import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServicesService } from '../../Services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private api: ApiServicesService
  ) {}
  oldPassword = '';
  newPassword1 = '';
  newPassword2 = '';
  ErrorMsg = '';
  ngOnInit(): void {}
  onSubmit() {
    if (this.newPassword1 == this.newPassword2) {
      if (this.newPassword1.length > 7) {
        let formData = new FormData();

        this.api.changePassword(this.oldPassword, this.newPassword1).subscribe({
          next: (data) => {
            this.oldPassword = '';
            this.newPassword1 = '';
            this.newPassword2 = '';
            this.activeModal.close();
          },
          error: (err) => {
            this.ErrorMsg = err.msg;
          },
        });
      } else {
        this.ErrorMsg = 'The new Passwords is Small!';
      }
    } else {
      this.ErrorMsg = 'The new Passwords is Not Compatible!';
    }
  }
  onChangeInput() {
    this.ErrorMsg = '';
  }
}
