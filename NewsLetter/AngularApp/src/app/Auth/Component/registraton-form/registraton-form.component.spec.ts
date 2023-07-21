import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistratonFormComponent } from './registraton-form.component';

describe('RegistratonFormComponent', () => {
  let component: RegistratonFormComponent;
  let fixture: ComponentFixture<RegistratonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistratonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistratonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
