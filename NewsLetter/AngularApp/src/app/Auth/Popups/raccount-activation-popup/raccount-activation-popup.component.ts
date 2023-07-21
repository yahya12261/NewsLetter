import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-raccount-activation-popup',
  templateUrl: './raccount-activation-popup.component.html',
  styleUrls: ['./raccount-activation-popup.component.css'],
})
export class RaccountActivationPopupComponent implements OnInit, AfterViewInit {
  Email!: String;
  constructor(public activeModal: NgbActiveModal, private router: Router) {}
  ngAfterViewInit(): void {}
  onLoginClick() {
    this.router.navigateByUrl('auth/login');
    this.activeModal.close();
  }

  ngOnInit(): void {}
}
