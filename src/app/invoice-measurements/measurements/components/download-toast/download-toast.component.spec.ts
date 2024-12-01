import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadToastComponent } from './download-toast.component';

describe('DownloadToastComponent', () => {
  let component: DownloadToastComponent;
  let fixture: ComponentFixture<DownloadToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
