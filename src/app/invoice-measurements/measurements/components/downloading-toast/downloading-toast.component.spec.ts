import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadingToastComponent } from './downloading-toast.component';

describe('DownloadingToastComponent', () => {
  let component: DownloadingToastComponent;
  let fixture: ComponentFixture<DownloadingToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadingToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadingToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
