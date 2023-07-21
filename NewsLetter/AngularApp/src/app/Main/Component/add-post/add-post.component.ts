import { Component, OnInit } from '@angular/core';
import { PostToAdd } from '../../Interfaces/app.interface';

import { ApiServicesService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  selectedFile!: File;
  imgPerview!: String;
  Paragraph = '';
  Post: PostToAdd = { image: this.selectedFile, Paragraph: '' };
  constructor(
    private api: ApiServicesService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  selectFiles(event: any): void {
    this.spinner.show();
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.spinner.hide();
        this.imgPerview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addPostDisable() {
    if (this.Post.Paragraph != '' || this.selectedFile) return false;
    return true;
  }

  addPost() {
    this.Post.image = this.selectedFile;
    if (this.selectedFile) {
      this.spinner.show();
      this.api.addPostWithImage(this.Post).subscribe({
        next: (Data) => {
          this.spinner.hide();
          this.router.navigateByUrl('Main/home');
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);
        },
      });
    } else {
      this.spinner.show();
      this.api.addPostWithoutImage(this.Post).subscribe({
        next: (Data) => {
          // window.location.reload();
          this.spinner.hide();
          this.router.navigateByUrl('Main/home');
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);
        },
      });
    }
    // window.location.reload();
    this.router.navigateByUrl('Main/home');
  }
}
