import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  template: `
    <button mat-raised-button
      [color]="color"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick.emit($event)">
      <mat-spinner *ngIf="loading" 
        diameter="20" 
        class="mr-2">
      </mat-spinner>
      <mat-icon *ngIf="icon && !loading" 
        class="mr-2">
        {{icon}}
      </mat-icon>
      <ng-content></ng-content>
    </button>
  `
})
export class CustomButtonComponent {
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;
  @Input() fullWidth = false;
  @Output() onClick = new EventEmitter<any>();

  get buttonClasses(): string {
    return `
      flex items-center justify-center
      ${this.fullWidth ? 'w-full' : ''}
      transition-all duration-200
      hover:shadow-md
    `;
  }
}