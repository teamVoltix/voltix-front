import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvMesHeaderComponent } from './inv-mes-header.component';



describe('InvoiceHeaderComponent', () => {
  let component: InvMesHeaderComponent
  let fixture: ComponentFixture<InvMesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvMesHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvMesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
