import { environment } from '../../../../environments/environment';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
} from '@angular/core';
import { Post } from '../../Interfaces/app.interface';
import { PostComponent } from '../post/post.component';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(PostComponent) postComponent!: PostComponent;

  constructor(private spinner: NgxSpinnerService, private router: Router) {}

  receiveDataFromChild(data: any) {
    this.searchText = data;
    this.postComponent.searchText = this.searchText;
    this.postComponent.myProfile = -1;
  }
  searchText: String = '';
  ngOnInit(): void {
    this.showSpinner();
  }

  showSpinner() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      } else if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });
  }

  // spinnerController(spinnerControllerBoolean : Boolean){
  //   if(spinnerControllerBoolean)
  //   this.SpinnerController.(true);
  //   else this.SpinnerController.emit(false);
  // }
}
