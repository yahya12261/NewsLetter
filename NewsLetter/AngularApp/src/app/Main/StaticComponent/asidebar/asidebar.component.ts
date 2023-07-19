import { ApiServicesService } from './../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Image, Person } from '../../Interfaces/app.interface';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-asidebar',
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.css'],
})
export class AsidebarComponent implements OnInit, AfterViewInit {
  Me!: Person;
  Img!: Image;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ApiService: ApiServicesService
  ) {
    // console.log(activatedRoute);
    this.ApiService.getPerson().subscribe((res: any) => {
      this.Me = res.person[0];
      this.Me.ProfileImage = res.ProfileImg[0];
    });
  }

  ngAfterViewInit(): void {
    // if (!this.Me) {
    //   window.location.reload();
    // }
  }
  getProfile() {
    try {
      let link = this.Me.ProfileImage.Link.split('/');
      return this.ApiService.getProfileLink() + link[link.length - 1];
    } catch (err) {
      return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg';
    }
  }

  getName() {
    try {
      return this.Me.first + ' ' + this.Me.last;
    } catch (err) {
      return 'First Last';
    }
  }
  ngOnInit(): void {
    // if (!this.Me) {
    //   window.location.reload();
    // }
  }
}
