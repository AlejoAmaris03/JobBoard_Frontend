import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthService, ExperienceService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { ExperienceModel, UserModel } from '../../../../core/models';

@Component({
  selector: 'app-experience-modal',
  imports: [
    MatDialogModule,
    MatTooltip,
    ReactiveFormsModule
  ],
  templateUrl: './experience-modal.html',
  styleUrl: './experience-modal.css'
})

export class ExperienceModal implements OnInit {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  protected btnDiasbled: boolean = true;
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  protected userLoggedIn: UserModel = this.authService.getUserLoggedIn();
  protected data: ExperienceModel = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ExperienceModal>)
  private experienceService = inject(ExperienceService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService);

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      applicant: ['']
    });

    this.getExperienceInfo();
  }

  protected saveExperienceInfo() {
    this.formSubmitted = true;

    if(this.form.valid) {
      this.experienceService.saveExperience(this.form.value).subscribe({
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
            this.toastrService.showError('Error', 'An error occurred while saving your experience');
        }
      });

      this.formSubmitted = false;
    }
  }

  async deleteExperience() {
    const res = await this.sweetAlertService.showConfirmationAndExecute(
      'Are you sure?',
      'You will delete a experience',
      'Yes, delete'
    );

    if(!res.isConfirmed)
      return;

    this.experienceService.deleteExperience(this.data.id).subscribe({
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
          this.toastrService.showError('Error', 'An error occurred while deleting your experience');
      }
    });
  }

  protected activeBtnSubmit() {
    this.btnDiasbled = false;
  }

  private getExperienceInfo() {
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
        jobTitle: this.data.jobTitle,
        companyName: this.data.companyName,
        startDate: this.data.startDate,
        endDate: this.data.endDate
      });
    }
  }
}
