import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() sendDataToParent = new EventEmitter<String>();
  SearchValue: String = '';
  constructor() {}

  ngOnInit(): void {}
  onClickChange() {
    this.sendDataToParent.emit(this.SearchValue);
  }
}
