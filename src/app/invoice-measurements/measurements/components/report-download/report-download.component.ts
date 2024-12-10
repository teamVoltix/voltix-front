import { Component, Input } from '@angular/core';
import { ReportService } from '../../services/report-service/report.service';

@Component({
  selector: 'app-report-download',
  standalone: true,
  imports: [],
  templateUrl: './report-download.component.html',
  styleUrl: './report-download.component.css',
})
export class ReportDownloadComponent {
  @Input() comparisonId!: number;
  constructor(private reportService: ReportService) {}

  ngAfterViewInit() {
    this.reportService.initializeModal();
  }

  showModal() {
    this.reportService.showModal();
  }

  hideModal() {
    this.reportService.hideModal();
  }


  downloadReport() {
    if (this.comparisonId) {
      this.reportService.downloadReport(this.comparisonId);
    } else {
      console.error('Comparison ID is not provided.');
    }
  }
}
