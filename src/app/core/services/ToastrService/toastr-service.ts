import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastrNotificationService {
  private toastrService = inject(ToastrService);

  public showSuccess(title: string, message: string): void {
    this.toastrService.success(message, title);
  }

  public showError(title: string, message: string): void {
    this.toastrService.error(message, title);
  }

  public clear() {
    this.toastrService.clear();
  }
}
