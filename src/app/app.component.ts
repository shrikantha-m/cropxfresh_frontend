import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '[attr.inert]': 'null',
    '[attr.aria-hidden]': 'null'
  }
})
export class AppComponent {
  title = 'cropxfresh-frontend';

  constructor(private elementRef: ElementRef) {
    // Ensure the app-root element never gets aria-hidden
    this.elementRef.nativeElement.removeAttribute('aria-hidden');
  }
}
