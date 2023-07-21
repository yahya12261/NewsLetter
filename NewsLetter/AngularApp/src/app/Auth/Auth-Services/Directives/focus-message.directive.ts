import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Inp } from '../interfaces/input.interface';

@Directive({
  selector: '[focusMessage]',
})
export class FocusMessageDirective implements OnInit {
  private messageElement!: HTMLElement; // Note the "!" non-null assertion operator

  @Input('focusMessage') input!: Inp;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    console.log(' interface ', this.input);
    this.CreateMyElement(this.input);
    if (this.input.inputName == 'First' || this.input.inputName == 'Last') {
      if (this.input.Len > 2) {
        this.messageElement.innerText = 'Validate';
        this.messageElement.style.display = 'none';
        this.messageElement.style.color = 'Green';
      } else {
        // this.messageElement = document.createElement('p');
        this.messageElement.innerText = 'Not Valid';
        this.messageElement.style.display = 'none';
        this.messageElement.style.color = 'Red';
        // console.log('message:', this.message);
        // Create the message element and add it to the DOM
      }
    } //else {
    // }
  }
  public CreateMyElement(i: Inp) {
    console.log('inputName', i.inputName);
    let Name = i.inputName;
    if (!this.messageElement) {
      this.messageElement = document.createElement('p');
      this.messageElement.setAttribute('Class', i.inputName + '');
      console.log(this.messageElement.getAttribute('Class'));
      this.el.nativeElement.parentNode.insertBefore(
        this.messageElement,
        this.el.nativeElement.nextSibling
      );
      // this.messageElement.id = 's';
    }
  }
  @HostListener('focus')
  onFocus() {
    // Show the message element when the input receives focus
    console.log(this.messageElement.getAttribute('class'));
    this.messageElement.style.display = 'block';
  }

  @HostListener('blur')
  onBlur() {
    // Hide the message element when the input loses focus
    //this.messageElement.style.display = 'none';
  }
}
