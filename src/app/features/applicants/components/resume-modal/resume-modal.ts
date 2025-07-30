import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthService, ResumeService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { ResumeModel, UserModel } from '../../../../core/models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resume-modal',
  imports: [
    MatDialogModule,
    MatTooltip,
    ReactiveFormsModule
  ],
  templateUrl: './resume-modal.html',
  styleUrl: './resume-modal.css'
})

export class ResumeModal implements OnInit {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  protected btnDiasbled: boolean = true;
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  protected userLoggedIn: UserModel = this.authService.getUserLoggedIn();
  private data: ResumeModel = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ResumeModal>)
  private resumeService = inject(ResumeService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService);

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      city: [''],
      applicant: ['']
    });

    this.getResumeInfo();
  }

  protected saveResumeInfo() {
    this.formSubmitted = true;

    if(this.form.valid) {
      this.resumeService.saveResumeInfo(this.form.value).subscribe({
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
            this.toastrService.showError('Error', 'An error occurred while saving your resume information');
        }
      })

      this.formSubmitted = false;
    }
  }

  protected validationPhoneNumber($event: Event) {
    const phoneNumber = Number(($event.target as HTMLInputElement).value);

    if(phoneNumber) {
      this.form.get('phoneNumber')?.setValidators([
        Validators.required,
        Validators.min(1000000),
        Validators.max(999999999999999)
      ]);
    }
    else {
      this.form.get('phoneNumber')?.setValue('');
      this.form.get('phoneNumber')?.clearValidators();
      this.form.get('phoneNumber')?.updateValueAndValidity();
    }
  }

  protected validationDateOfBirth($event: Event) {
    const dateOfBirth = ($event.target as HTMLInputElement).value;

    if(dateOfBirth) {
      const year = dateOfBirth.split('-').map(Number)[0];
      const minimumBirthYear = new Date().getFullYear() - 18;

      if(year > minimumBirthYear)
        this.form.get('dateOfBirth')?.setErrors({ 'dateOfBirthNotValid': true });
    }
    else {
      this.form.get('dateOfBirth')?.clearValidators();
      this.form.get('dateOfBirth')?.updateValueAndValidity();
    }
  }

  protected activeBtnSubmit() {
    this.btnDiasbled = false;
  }

  private getResumeInfo() {
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
        phoneNumber: this.data?.phoneNumber,
        dateOfBirth: this.data?.dateOfBirth,
        city: this.data?.city
      });
    }
  }
}
