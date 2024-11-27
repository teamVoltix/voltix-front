import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementCompareComponent } from './measurement-compare.component';

describe('MeasurementCompareComponent', () => {
  let component: MeasurementCompareComponent;
  let fixture: ComponentFixture<MeasurementCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementCompareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
