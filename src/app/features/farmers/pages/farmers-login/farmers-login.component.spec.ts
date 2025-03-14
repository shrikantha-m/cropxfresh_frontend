import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersLoginComponent } from './farmers-login.component';

describe('FarmersLoginComponent', () => {
  let component: FarmersLoginComponent;
  let fixture: ComponentFixture<FarmersLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmersLoginComponent]
    });
    fixture = TestBed.createComponent(FarmersLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
