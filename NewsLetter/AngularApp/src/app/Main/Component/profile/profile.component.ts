import { Person } from './../../Interfaces/app.interface';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeProfilePhotoComponent } from '../../Popups/change-profile-photo/change-profile-photo.component';
import { ChangePasswordComponent } from '../../Popups/change-password/change-password.component';
import { ApiServicesService } from '../../Services/api.service';
import { PostComponent } from '../post/post.component';

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
  constructor(private modalService: NgbModal, private api: ApiServicesService) {
    this.api.getPerson().subscribe((res: any) => {
      this.person = res.person[0];
      this.person.ProfileImage = res.ProfileImg[0];
    });
  }
  @ViewChild(PostComponent) postComponent!: PostComponent;
  getProfilePhoto() {
    let link = this.person.ProfileImage.Link.split('/');
    return this.api.getProfileLink() + link[link.length - 1];
  }
  getDataFromPost(i: number, j: number) {}
  ngOnInit() {
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
    console.log(this.person.id);
    this.postComponent.myProfile = this.person.id;
    this.postComponent.searchText = 'SearchProfile';
  }
}
