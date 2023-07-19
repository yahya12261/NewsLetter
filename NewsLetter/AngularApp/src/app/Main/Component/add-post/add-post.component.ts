import { Component, OnInit } from '@angular/core';
import { PostToAdd } from '../../Interfaces/app.interface';

import { ApiServicesService } from '../../Services/api.service';
import { Router } from '@angular/router';

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
  constructor(private api: ApiServicesService, private router: Router) {}

  ngOnInit(): void {}
  selectFiles(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e.target.result);
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
    console.log(this.Post.Paragraph);

    this.Post.image = this.selectedFile;
    console.log('do this');
    if (this.selectedFile) {
      this.api.addPostWithImage(this.Post).subscribe({
        next: (Data) => {
          // this.router.navigateByUrl('Main/home');
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.api.addPostWithoutImage(this.Post).subscribe({
        next: (Data) => {
          // this.router.navigateByUrl('Main/home');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    window.location.reload();
    this.router.navigateByUrl('Main/home');
  }
}
