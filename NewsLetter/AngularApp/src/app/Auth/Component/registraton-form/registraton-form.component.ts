import { User } from './../../Auth-Services/interfaces/app.interface';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../Auth-Services/api.service';

import { Router } from '@angular/router';
import { Inp } from '../../Auth-Services/interfaces/input.interface';
import { FocusMessageDirective } from '../../Auth-Services/Directives/focus-message.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RaccountActivationPopupComponent } from '../../Popups/raccount-activation-popup/raccount-activation-popup.component';

@Component({
  selector: 'app-registraton-form',
  templateUrl: './registraton-form.component.html',
  styleUrls: ['./registraton-form.component.css'],
})
export class RegistratonFormComponent implements OnInit {
  input: Inp = {
    inputName: '',
    Len: 0,
  };

  validInput = {
    First: 'color : Red ; ',
    Last: 'color : Red ; ',
    Dob: 'color : Red ; ',
    Email: 'color : Red ; ',
    Pass1: 'color : Red ; ',
    Pass2: 'color : Red ; ',
  };
  customFormValidetor = false;
  recaptcha!: FormGroup;
  inputValueLength = 0;
  Firstmsg = 'this msg';
  siteKey!: any;
  errorMsg: String = '';
  RegForm!: FormGroup;
  user: User = {
    Email: '',
    Pass: '',
    First: '',
    Middle: '',
    Last: '',
    Dob: new Date(),
  };
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.RegForm = this.fb.group({
      First: ['', Validators.required],
      Last: ['', Validators.required],
      Middle: [''],
      Dob: ['', Validators.required],
      Email: ['', Validators.required],
      Pass1: ['', Validators.required],
      Pass2: ['', Validators.required],
    });

    this.recaptcha = this.fb.group({
      recaptcha: ['', Validators.required],
    });
    this.siteKey = '6LfGbR0nAAAAACgSOc9ouGiphHOpRTVNXZNdI1pN';
    this.RegForm.valueChanges.subscribe((value) => {
      if (this.errorMsg != '') {
        this.errorMsg = '';
        this.validInput.Email = 'color :rgb(0, 255, 0) ;';
      }
    });
  }
  onInputChange(FormControlName: String) {
    switch (FormControlName) {
      case 'First':
        if (this.RegForm.value.First.length > 2) {
          this.validInput.First = 'color : rgb(0, 255, 0) ;';
        } else {
          this.validInput.First = 'color : Red ;';

          this.customFormValidetor = false;
        }
        break;
      case 'Last':
        if (this.RegForm.value.Last.length > 2) {
          this.validInput.Last = 'color : rgb(0, 255, 0) ;';
        } else {
          this.validInput.Last = 'color : Red ;';
          this.customFormValidetor = false;
        }
        break;
      case 'Dob':
        if (this.RegForm.value.Dob.length) {
          this.validInput.Dob = 'color : rgb(0, 255, 0) ;';
        } else {
          this.validInput.Dob = 'color : Red ;';

          this.customFormValidetor = false;
        }
        break;
      case 'Email':
        if (
          this.RegForm.value.Email.length > 10 &&
          this.RegForm.value.Email.includes('@') &&
          this.RegForm.value.Email.includes('.')
        ) {
          this.validInput.Email = 'color : rgb(0, 255, 0) ;';
        } else {
          this.validInput.Email = 'color : Red ;';
          this.customFormValidetor = false;
        }
        break;
      case 'Pass1':
        if (this.RegForm.value.Pass1.length > 7) {
          this.validInput.Pass1 = 'color : rgb(0, 255, 0) ;';
        } else {
          this.validInput.Pass1 = 'color : Red ;';
          this.customFormValidetor = false;
        }
        break;
      case 'Pass2':
        if (
          this.RegForm.value.Pass2.length > 7 &&
          this.RegForm.value.Pass1 == this.RegForm.value.Pass2
        ) {
          this.validInput.Pass2 = 'color : rgb(0, 255, 0) ;';
        } else {
          this.validInput.Pass2 = 'color : Red ;';
          this.customFormValidetor = false;
        }
        break;
    }
  }

  onSubmit() {
    const firstValue = this.RegForm.value.First;
    const lastValue = this.RegForm.value.Last;
    const middleValue = this.RegForm.value.Middle;
    const dobValue = this.RegForm.value.Dob;
    const emailValue = this.RegForm.value.Email;
    const pass1Value = this.RegForm.value.Pass1;
    const pass2Value = this.RegForm.value.Pass2;
    this.user.First = firstValue;
    this.user.Last = lastValue;
    this.user.Middle = middleValue;
    this.user.Dob = dobValue;
    this.user.Email = emailValue;
    this.user.Pass = pass1Value;
    if (this.RegForm.get('Pass1')?.value == this.RegForm.get('Pass2')?.value) {
      this.apiService.register(this.user).subscribe({
        next: (data) => {
          if (data.msg == 'Registered!')
            this.modalService.open(
              RaccountActivationPopupComponent
            ).componentInstance.Email = emailValue;
          // this.modalService.open(RaccountActivationPopupComponent).componentInstance.Email = "";
          // modal.componentInstance.Email = 'Email';
          // this.router.navigateByUrl('auth/login');
          else {
            this.errorMsg = 'This Email is Alredy use !';
            this.validInput.Email = 'color : Red;';
          }
        },
        error: (err) => {
          this.errorMsg = 'This Email is Alredy use !';
          this.validInput.Email = 'color : Red;';
        },
      });
    } else {
      this.errorMsg = "The Password isn't Compatible";
      this.validInput.Email = 'color : Red;';
    }
  }
}
