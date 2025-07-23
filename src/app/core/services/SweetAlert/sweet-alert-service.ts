import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class SweetAlertService {
  private router = inject(Router);

  public showNotification(title: string, message: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }

  public redirect(title: string, message: string, route: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate([route]);
    });
  }

  public sessionExpired(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Login',
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }

  public loadingAndRedirect(title: string, message: string, route: string) {
    Swal.fire({
      title: title,
      text: message,
      timer: 1500,
      timerProgressBar: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      this.router.navigate([route]);
    });
  }

  async showConfirmationAndExecute(title: string, message: string, btnTitle: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: btnTitle
    });
  }
  
  public showMessageAndReloadPage(title: string, message: string, icon: SweetAlertIcon, btnTitle: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: btnTitle,
    }).then(() => {
      window.location.reload();
    });
  }
}
