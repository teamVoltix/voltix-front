import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-downloading-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './downloading-toast.component.html',
  styleUrl: './downloading-toast.component.css'
})
export class DownloadingToastComponent {
  isToastExiting = false;
  pdfName = '546846.PDF';
  percentage = 80


  closeToast() {
    this.isToastExiting = true;
  }
}
