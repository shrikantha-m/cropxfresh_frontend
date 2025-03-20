import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  template: `
    <mat-card [class]="cardClasses">
      <mat-card-header *ngIf="title || subtitle" class="pb-4">
        <mat-card-title *ngIf="title" class="text-xl font-semibold">{{title}}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle" class="text-gray-600">{{subtitle}}</mat-card-subtitle>
      </mat-card-header>
      
      <img *ngIf="imageUrl" [src]="imageUrl" [alt]="imageAlt"
           class="w-full h-48 object-cover rounded-t-lg">
      
      <mat-card-content class="p-4">
        <ng-content></ng-content>
      </mat-card-content>
      
      <mat-card-actions *ngIf="showActions" class="flex justify-end p-4 gap-2">
        <ng-content select="[actions]"></ng-content>
      </mat-card-actions>
    </mat-card>
  `
})
export class CustomCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() imageAlt?: string = 'Card image';
  @Input() elevated = false;
  @Input() showActions = false;

  get cardClasses(): string {
    return `
      bg-white rounded-lg overflow-hidden
      ${this.elevated ? 'shadow-lg hover:shadow-xl transition-shadow duration-300' : 'shadow'}
    `;
  }
}