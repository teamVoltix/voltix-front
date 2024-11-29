import { Component } from '@angular/core';
import { ReportDownloadComponent } from '../report-download/report-download.component';
import { ReportService } from '../../services/report-service/report.service';
import { DownloadToastComponent } from '../download-toast/download-toast.component';
import { DownloadingToastComponent } from '../downloading-toast/downloading-toast.component';
import { InvoiceHeaderComponent } from '../../../invoice/components/invoice-header/invoice-header.component';

@Component({
  selector: 'app-measurement-compare',
  standalone: true,
  imports: [ReportDownloadComponent, DownloadToastComponent, DownloadingToastComponent, InvoiceHeaderComponent],
  templateUrl: './measurement-compare.component.html',
  styleUrl: './measurement-compare.component.css',
})
export class MeasurementCompareComponent {

  constructor(protected reportService: ReportService){}

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
