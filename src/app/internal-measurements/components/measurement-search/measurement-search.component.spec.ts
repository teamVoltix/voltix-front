import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementSearchComponent } from './measurement-search.component';

describe('MeasurementSearchComponent', () => {
  let component: MeasurementSearchComponent;
  let fixture: ComponentFixture<MeasurementSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
