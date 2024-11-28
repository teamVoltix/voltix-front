import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReportService } from '../../services/report-service/report.service';

@Component({
  selector: 'app-download-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-toast.component.html',
  styleUrl: './download-toast.component.css',
})
export class DownloadToastComponent {
  isToastExiting = false;
  pdfName = '546846.PDF';
  percentage = 80

  constructor(protected reportService: ReportService){}

  closeToast() {
    this.isToastExiting = true;

    setTimeout(() => {
      this.reportService.downloadFinished = false;
    }, 400);
  }
}
