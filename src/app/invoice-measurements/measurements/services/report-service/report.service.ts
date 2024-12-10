import { Injectable } from '@angular/core';
import { InstanceOptions, Modal, ModalInterface, ModalOptions } from 'flowbite';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  downloading = false;
  downloadFinished = false;

  private $modalElement: HTMLElement | null = null;
  private modal: ModalInterface | null = null;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      
    },
    onShow: () => {
      
    },
    onToggle: () => {
      
    },
  };

  instanceOptions: InstanceOptions = {
    id: 'reportDownloadModal',
    override: true,
  };

  constructor(private http: HttpClient) {}

  initializeModal() {
    this.$modalElement = document.querySelector('#reportDownloadModal');

    if (this.$modalElement) {
      this.modal = new Modal(
        this.$modalElement,
        this.modalOptions,
        this.instanceOptions
      );
    }
  }

  showModal() {
    if (this.modal) {
      this.modal.show();
    }
  }

  hideModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  downloadReport(comparisonId: number) {
    const url = `http://127.0.0.1:8000/api/measurements/report/download/?id=${comparisonId}`;
    this.downloading = true;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        this.downloading = false;
        this.downloadFinished = true;

        // Trigger download in the browser
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comparison_report_${comparisonId}.pdf`; // Adjust filename as needed
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading the report:', error);
        this.downloading = false;
      },
    });
  }

  
}
