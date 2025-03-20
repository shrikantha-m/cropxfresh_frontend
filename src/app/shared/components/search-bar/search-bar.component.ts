import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="relative w-full max-w-xl">
      <mat-form-field appearance="outline" class="w-full">
        <mat-icon matPrefix class="text-gray-500">search</mat-icon>
        <input matInput
          [placeholder]="placeholder"
          [formControl]="searchControl"
          class="pl-2"
          (keyup.enter)="onEnter.emit(searchControl.value || '')">
        <button mat-icon-button matSuffix *ngIf="searchControl.value"
          (click)="clearSearch()"
          class="text-gray-500 hover:text-gray-700">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
    </div>
  `
})
export class SearchBarComponent {
  @Input() placeholder = 'Search...';
  @Output() searchChange = new EventEmitter<string>();
  @Output() onEnter = new EventEmitter<string>();

  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchChange.emit(value || '');
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}