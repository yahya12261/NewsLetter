import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaccountActivationPopupComponent } from './raccount-activation-popup.component';

describe('RaccountActivationPopupComponent', () => {
  let component: RaccountActivationPopupComponent;
  let fixture: ComponentFixture<RaccountActivationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaccountActivationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaccountActivationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
