import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEntryComponent } from './AuthEntry.component';

describe('HomeComponent', () => {
  let component: AuthEntryComponent;
  let fixture: ComponentFixture<AuthEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
