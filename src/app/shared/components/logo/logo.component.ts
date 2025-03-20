import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="logo-container" [ngStyle]="{'width': width}">
      <img src="assets/images/logo.png" [alt]="alt" class="logo-image">
    </div>
  `,
  styles: [`
    .logo-container {
      display: inline-block;
    }
    .logo-image {
      width: 100%;
      height: auto;
    }
  `]
})
export class LogoComponent {
  @Input() width: string = '150px';
  @Input() alt: string = 'CropXFresh Logo';
}