import { Person } from './../../Interfaces/app.interface';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeProfilePhotoComponent } from '../../Popups/change-profile-photo/change-profile-photo.component';
import { ChangePasswordComponent } from '../../Popups/change-password/change-password.component';
import { ApiServicesService } from '../../Services/api.service';
import { PostComponent } from '../post/post.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  searchText: String = '';
  ShowMoreBoolean = false;
  Comment = '';
  person!: Person;

  constructor(
    private modalService: NgbModal,
    private api: ApiServicesService,
    private spinner: NgxSpinnerService
  ) {}
  @ViewChild(PostComponent) postComponent!: PostComponent;
  getProfilePhoto() {
    if (this.person.ProfileImage.Link) {
      let link = this.person.ProfileImage.Link.split('/');
      return this.api.getProfileLink() + link[link.length - 1];
    } else {
      return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg';
    }
  }
  getDataFromPost(i: number, j: number) {}
  ngOnInit() {
    this.spinner.show();
    this.api.getPerson().subscribe((res: any) => {
      this.spinner.hide();
      this.person = res.person[0];
      this.person.ProfileImage = res.ProfileImg[0];
    });
    this.spinner.hide();
    this.getDataFromPost(2, 0);
  }
  onChangeProfile(e: any) {
    const modalRef = this.modalService.open(ChangeProfilePhotoComponent);
    modalRef.componentInstance.ProfilePhoto = e;
  }
  onPasswordChange() {
    const modalRef = this.modalService.open(ChangePasswordComponent);
  }
  ngAfterViewInit(): void {
    this.postComponent.myProfile = this.person.id;
    this.postComponent.searchText = 'SearchProfile';
  }
}
