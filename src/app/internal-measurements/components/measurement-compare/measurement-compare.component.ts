import { Component } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';

@Component({
  selector: 'app-measurement-compare',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './measurement-compare.component.html',
  styleUrl: './measurement-compare.component.css',
})
export class MeasurementCompareComponent {
  //TODO: quitar cuando se conecte al backend
  invoiceData = {
    id: '664705',
    loadDate: '11/09/2024',
    measurementPeriod: '08/09/2024 - 09/10/2024',
    measuredDays: '31',
    consumption: '266',
    amount: '51,82',
  };

  measurementData = {
    id: '664705',
    loadDate: '09/09/2024',
    measurementPeriod: '08/09/2024 - 09/10/2024',
    measuredDays: '31',
    consumption: '266',
    amount: '40',
  };
}
