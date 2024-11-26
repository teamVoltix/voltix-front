import { Injectable } from '@angular/core';
import { InstanceOptions, Modal, ModalInterface, ModalOptions } from 'flowbite';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

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

  constructor() { }

  initializeModal() {
    this.$modalElement = document.querySelector('#reportDownloadModal');

    if (this.$modalElement) {
      this.modal = new Modal(this.$modalElement, this.modalOptions, this.instanceOptions);
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
}
