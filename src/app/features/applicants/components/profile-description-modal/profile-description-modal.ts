import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthService, ResumeService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { ResumeModel, UserModel } from '../../../../core/models';

@Component({
  selector: 'app-profile-description-modal',
  imports: [
    MatDialogModule,
    MatTooltip,
    ReactiveFormsModule
  ],
  templateUrl: './profile-description-modal.html',
  styleUrl: './profile-description-modal.css'
})

export class ProfileDescriptionModal implements OnInit {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  protected btnDiasbled: boolean = true;
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  protected userLoggedIn: UserModel = this.authService.getUserLoggedIn();
  private data: ResumeModel = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ProfileDescriptionModal>)
  private resumeService = inject(ResumeService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService);

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      title:[''],
      description: [''],
      applicant: ['']
    });

    this.getProfileDescriptionInfo();
  }

  protected saveProfileDescriptionInfo() {
    this.formSubmitted = true;

    if(this.form.valid) {
      this.resumeService.saveProfileDescription(this.form.value).subscribe({
        next: (res) => {
          this.dialogRef.close(true);
          this.toastrService.showSuccess('Great!', res.message);
        },
        error: (err) => {
          if(err.status === 400 && err.error.error)
            this.toastrService.showError('Error', err.error.error);
          else if(!this.authService.isAuthenticated())
            this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
          else 
            this.toastrService.showError('Error', 'An error occurred while saving your profile description');
        }
      })

      this.formSubmitted = false;
    }
  }

  protected activeBtnSubmit() {
    this.btnDiasbled = false;
  }

  private getProfileDescriptionInfo() {
    this.form.patchValue({
      applicant: {
        id: this.userLoggedIn.id,
        name: this.userLoggedIn.name,
        surname: this.userLoggedIn.surname,
        email: this.userLoggedIn.email
      }
    });

    if(this.data) {
      this.form.patchValue({
        id: this.data.id,
        title: this.data?.title,
        description: this.data?.description
      });
    }
  }
}
