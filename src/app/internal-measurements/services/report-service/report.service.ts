import { Injectable } from '@angular/core';
import { InstanceOptions, Modal, ModalInterface, ModalOptions } from 'flowbite';

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
      console.log('modal is hidden');
    },
    onShow: () => {
      console.log('modal is shown');
    },
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };

  instanceOptions: InstanceOptions = {
    id: 'reportDownloadModal',
    override: true,
  };

  constructor() {}

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

   // TODO: Método para simular la descarga, cambiar cuando el backend esté listo
   downloadReport() {
    this.downloading = true;

    setTimeout(() => {
      this.downloading = false;
      this.downloadFinished = true;
    }, 3000); // Simulamos 3 segundos de descarga
  }

}
