import { ApiService } from './../../../Auth/Auth-Services/api.service';
import { Component, HostListener, OnInit, Output } from '@angular/core';
import { Image, Post } from '../../Interfaces/app.interface';
import { ApiServicesService } from '../../Services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    ++this.ScrolCountTimes;
    if (this.ScrolCountTimes == 100) {
      this.ScrolCountTimes = 0;
      this.spinner.show();

      this.getPost();
    }
  }

  ScrolCountTimes = 0;

  searchText: String = '';
  Comment: string = '';
  PostsArray!: any;
  Posts!: Post[];
  myProfile = -1;

  constructor(
    private api: ApiServicesService,
    private spinner: NgxSpinnerService
  ) {}
  getDataFromPost(j: number, i: number) {
    try {
      if (this.Posts[j].comments) {
        let link =
          this.Posts[j].comments[i].personInfo.ProfileImage.Link +
          '' +
          this.Posts[j].comments[i].personInfo.ProfileImage.Ext;
        return link;
      } else return;
    } catch (err) {
      console.log(err);
      return;
    }
  }
  ChangeCommentAdd(j: number) {
    this.Posts[j].addComment = !this.Posts[j].addComment;
  }

  disLike(j: number) {
    this.Posts[j].IsLike = 0;
    this.api.makedisLike(this.Posts[j].postId).subscribe((res: any) => {});

    this.Posts[j].likesCount = this.Posts[j].likesCount - 1;
  }
  makeLike(j: number) {
    this.Posts[j].IsLike = 1;

    this.api.makeLike(this.Posts[j].postId).subscribe((res: any) => {});
    this.Posts[j].likesCount = this.Posts[j].likesCount + 1;
  }
  onClickAddCoumment(id: number, j: number) {
    this.spinner.show();
    this.api.setComment(this.Comment, id).subscribe((res: any) => {
      this.spinner.hide();
    });
    this.Comment = '';
    this.Posts[j].addComment = false;
    this.getPost();
  }
  getCommentAdd(j: number) {
    return this.Posts[j].addComment;
  }

  getMyLike(j: number) {
    if (this.Posts[j].IsLike == 1) {
      return true;
    } else {
      return false;
    }
  }
  ishaveImage(j: number) {
    if (this.Posts[j].imgLink) return true;
    return false;
  }
  getImage(imgLink: String) {
    let link = imgLink.split('/');
    return this.api.getPostlink() + link[link.length - 1];
  }
  getlastCommnetProfilePhoto(j: number) {
    let link =
      this.Posts[j].lastComment.personInfo.ProfileImage.Link.split('/');

    return this.api.getProfileLink() + link[link.length - 1];
  }

  getCommentsProfilePhoto(j: number, i: number) {
    let link =
      this.Posts[j].comments[i].personInfo.ProfileImage.Link.split('/');

    return this.api.getProfileLink() + link[link.length - 1];
  }
  getPostProfilePhotoFromIndex(j: number) {
    let link = this.Posts[j].personInfo.ProfileImage.Link.split('/');

    return this.api.getProfileLink() + link[link.length - 1];
  }
  showMoreComment(j: number) {
    this.spinner.show();
    this.Posts[j].showMore = true;
    this.api
      .getAllCommentFromPostId(this.Posts[j].postId)
      .subscribe((res: any) => {
        this.Posts[j].comments = res.comments;
        this.spinner.hide();
      });
  }
  getPost() {
    this.spinner.show();
    this.api.getPosts().subscribe((res: any) => {
      this.Posts = res.result;
      this.spinner.hide();
    });
  }

  ngOnInit() {
    this.api.getrefreshPost.subscribe(() => {
      this.getPost();
    });
    this.getPost();
  }
}
