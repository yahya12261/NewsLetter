import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServicesService } from '../../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile-photo',
  templateUrl: './change-profile-photo.component.html',
  styleUrls: ['./change-profile-photo.component.css'],
})
export class ChangeProfilePhotoComponent implements OnInit, AfterViewInit {
  constructor(
    public activeModal: NgbActiveModal,
    private api: ApiServicesService,
    private router: Router
  ) {}
  selectedFile!: File;
  ProfilePhoto!: any;
  imgPerview!: String;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.selectedFile = this.ProfilePhoto.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgPerview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  close() {
    if (this.selectedFile) {
      this.api.UpdateProfile(this.selectedFile).subscribe({
        next: (Data) => {
          this.router.navigateByUrl('Main');
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.activeModal.close();
    } else {
      this.activeModal.close();
    }
  }
}
