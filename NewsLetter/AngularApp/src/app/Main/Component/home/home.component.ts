import { environment } from '../../../../environments/environment';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Post } from '../../Interfaces/app.interface';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(PostComponent) postComponent!: PostComponent;
  receiveDataFromChild(data: any) {
    this.searchText = data;
    this.postComponent.searchText = this.searchText;
    this.postComponent.myProfile = -1;
  }
  searchText: String = '';

  ngOnInit(): void {
    // console.log((this.postComponent.searchText = this.searchText));
  }
  ngAfterViewInit(): void {}
}
