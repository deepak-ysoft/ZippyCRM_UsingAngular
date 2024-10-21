import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loadingCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}
  load() {
    this.loadingCount++;
    this.spinnerService;
    this.spinnerService.show(undefined, {
      type: 'line-scale-pulse-out-rapid',
      bdColor: 'rgba(0,0,0,0.2)',
      color: '#fff',
      size: 'medium',
    });
  }
  idel() {
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this.loadingCount = 0;
      this.spinnerService.hide();
    }
  }
}
