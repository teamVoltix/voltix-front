import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceImageComponent } from './invoice-image.component';

describe('InvoiceImageComponent', () => {
  let component: InvoiceImageComponent;
  let fixture: ComponentFixture<InvoiceImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
