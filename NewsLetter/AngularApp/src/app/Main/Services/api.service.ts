import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image, Post, PostToAdd } from '../Interfaces/app.interface';
import { environment } from '../../../environments/environment.prod';
const baseApiLink = environment.BaseLink;
const BaseAppUrl = baseApiLink + 'api/v1/';

const Auth_API = BaseAppUrl + 'auth/';

const Person_API = BaseAppUrl + 'person/';

const Post_API = BaseAppUrl + 'Post/';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  })
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache'),
};
@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {}
  private _refreshPost = new Subject<void>();
  get getrefreshPost() {
    return this._refreshPost;
  }
  formData = new FormData();
  getPerson() {
    return this.http.get(Person_API + 'getPerson', httpOptions);
  }
  addPostWithImage(postToAdd: PostToAdd): Observable<any> {
    this.formData.delete('Paragraph');
    this.formData.delete('file');
    this.formData.append('file', postToAdd.image);
    this.formData.append('Paragraph', postToAdd.Paragraph + '');
    // console.log('i am work in angular');
    return this.http
      .post(Post_API + 'addPostwithImage', this.formData, httpOptions)
      .pipe(
        tap(() => {
          this._refreshPost.next();
        })
      );
  }
  addPostWithoutImage(postToAdd: PostToAdd): Observable<any> {
    // this.formData.append('file', postToAdd.image);

    this.formData.delete('Paragraph');
    this.formData.append('Paragraph', postToAdd.Paragraph + '');
    console.log('i am work in angular');
    return this.http.post(
      Post_API + 'addPostwithoutImage',
      this.formData,
      httpOptions
    );
  }
  getPosts() {
    return this.http.get(Post_API + 'getPosts', httpOptions);
  }

  getPostlink(): String {
    return Post_API + 'getPostsImg/' + '';
  }
  makeLike(postId: number) {
    console.log('PostId', postId);
    this.formData.delete('postId');
    this.formData.append('postId', postId + '');
    return this.http.post(Post_API + 'makeLike', this.formData, httpOptions);
  }
  makedisLike(postId: number) {
    this.formData.delete('postId');

    this.formData.append('postId', postId + '');
    return this.http.post(Post_API + 'makeDisLike', this.formData, httpOptions);
  }
  setComment(comment: String, postId: number) {
    this.formData.delete('commentContent');
    this.formData.delete('postId');

    this.formData.append('commentContent', comment + '');
    this.formData.append('postId', postId + '');
    return this.http.post(Post_API + 'setComment', this.formData, httpOptions);
  }
  getAllCommentFromPostId(postId: number) {
    return this.http.get(
      Post_API + 'getAllCommentFromPostId/' + postId + '',
      httpOptions
    );
  }
  UpdateProfile(image: File): Observable<any> {
    this.formData.delete('file');
    this.formData.append('file', image);
    return this.http.post(
      Post_API + 'ProfileUpdate',
      this.formData,
      httpOptions
    );
  }
  getProfileLink() {
    return Post_API + 'getProfileImg/';
  }
  changePassword(oldPass: String, newPass: String) {
    this.formData.delete('oldPass');
    this.formData.delete('newPass');
    this.formData.append('oldPass', oldPass + '');
    this.formData.append('newPass', newPass + '');
    return this.http.post(
      Auth_API + 'ChangePassword',
      this.formData,
      httpOptions
    );
  }
}
