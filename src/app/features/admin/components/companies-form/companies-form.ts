import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthService, CompanyService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { CompanyModel } from '../../../../core/models';

@Component({
  selector: 'app-companies-form',
  imports: [
    MatDialogModule,
    MatIcon,
    MatTooltip,
    ReactiveFormsModule
  ],
  templateUrl: './companies-form.html',
  styleUrl: './companies-form.css'
})

export class CompaniesForm {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  protected image: File | null = null;
  private companyService = inject(CompanyService)
  private authService = inject(AuthService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlert = inject(SweetAlertService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CompaniesForm>);
  private data = inject<CompanyModel>(MAT_DIALOG_DATA);
  
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: null
    });

    if(this.data) {
      this.fillFormWithData();
    }
  }

  protected onSelectFile(event: Event) {
    const file = (event.target as HTMLInputElement);

    if(file.files && file.files.length > 0) {
      this.image = file.files[0];
      this.form.get('image')?.setValue(this.image);
    }
  }

  protected submitForm(): void {
    this.toastrService.clear();
    this.formSubmitted = true;

    if(this.form.valid) {
      const formData = new FormData();
      const action = this.form.controls['id'].value === '' ? 'add' : 'edit';
      const company: CompanyModel = {
        id: this.form.controls['id'].value,
        name: this.form.controls['name'].value,
        description: this.form.controls['description'].value,
        imageName: null
      }

      formData.append('company', new Blob(
        [JSON.stringify(company)],
        { type: 'application/json' }
      ));
      formData.append('image', this.form.get('image')?.value || new Blob([], {type: 'image/png'}));

      if(action === 'add')
        this.addCompany(formData);
      else if(action === 'edit')
        this.editCompany(formData);

      this.formSubmitted = false;      
    }
  }

  private addCompany(formData: FormData) {
    this.companyService.registerCompany(formData).subscribe({
      next: (res) => {
        this.dialogRef.close(res.company);
        this.toastrService.showSuccess('Great!', res.message);
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlert.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'Something went wrong during registration');
      }
    });
  }

  private editCompany(formData: FormData) {
    this.companyService.editCompany(formData).subscribe({
      next: (res) => {
        this.dialogRef.close(res.company);
        this.toastrService.showSuccess('Great!', res.message);
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlert.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'Something went wrong during registration');
      }
    });
  }

  private fillFormWithData() {
    this.form.patchValue({
      id: this.data.id,
      name: this.data.name,
      description: this.data.description
    });
  }
}
