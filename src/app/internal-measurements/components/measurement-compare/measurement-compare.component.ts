import { Component } from '@angular/core';
import { ReportDownloadComponent } from '../report-download/report-download.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { ReportService } from '../../services/report-service/report.service';

@Component({
  selector: 'app-measurement-compare',
  standalone: true,
  imports: [ButtonComponent, ReportDownloadComponent],
  templateUrl: './measurement-compare.component.html',
  styleUrl: './measurement-compare.component.css',
})
export class MeasurementCompareComponent {
  
  constructor(private reportService: ReportService){}

  showModal(){
    this.reportService.showModal();
  }

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
