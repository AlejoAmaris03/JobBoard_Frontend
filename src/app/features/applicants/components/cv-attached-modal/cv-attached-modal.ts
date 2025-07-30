import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { ApplicantCvService, AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { ApplicantCVModel, UserModel } from '../../../../core/models';

@Component({
  selector: 'app-cv-attached-modal',
  imports: [
    MatDialogModule,
    MatTooltip,
  ],
  templateUrl: './cv-attached-modal.html',
  styleUrl: './cv-attached-modal.css'
})

export class CvAttachedModal {
  private authService = inject(AuthService);
  protected userLoggedIn: UserModel = this.authService.getUserLoggedIn();
  protected data: ApplicantCVModel = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<CvAttachedModal>)
  private cvService = inject(ApplicantCvService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService);

  protected changeCvFile(event: Event) {
    this.toastrService.clear();

    const allowedFileTypes = ['pdf'];
    const image = (event.target as HTMLInputElement);
    const formData = new FormData;
    const applicant: any = {
      id: this.userLoggedIn.id,
      name: this.userLoggedIn.name,
      surname: this.userLoggedIn.surname,
      email: this.userLoggedIn.email
    };

    formData.append('applicant', new Blob(
      [JSON.stringify(applicant)],
      { type: 'application/json' }
    ));
    
    if(image.files && image.files.length > 0) {
      const imageType = image.files[0].type;

      if(!allowedFileTypes.includes(imageType.split('/')[1].toString())) {
        this.toastrService.showError('Error', 'CV format not valid');
        return;
      }

      formData.append('cv', image.files[0]);

      this.cvService.saveCV(formData).subscribe({
        next: (res) => {
          this.dialogRef.close(true);
          this.toastrService.showSuccess('Great!', res.message);
        },
        error: (err) => this.showErrors(err, 'An error occurred while saving cv file.')
      });
    }
  }

  async deleteCvFile() {
    const res = await this.sweetAlertService.showConfirmationAndExecute(
      'Are you sure?',
      'You will delete your CV',
      'Yes, delete it'
    );

    if(!res.isConfirmed)
      return;

    this.cvService.deleteCV(this.data.id).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
        this.toastrService.showSuccess('Great!', res.message);
      },
      error: (err) => this.showErrors(err, 'An error occurred while deleting cv file.')
    });
  }

  private showErrors(err: any, message: string) {
    if(err.status === 400 && err.error.error)
      this.toastrService.showError('Error', err.error.error);
    else if(!this.authService.isAuthenticated())
      this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
    else 
      this.toastrService.showError('Error', message);
  }
}
