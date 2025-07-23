import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { Oauth2Google } from "../../../../shared/oauth2-google/oauth2-google";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-sign-up',
  imports: [
    ReactiveFormsModule,
    Oauth2Google,
    RouterLink
],
  templateUrl: './form-sign-up.html',
  styleUrl: './form-sign-up.css'
})

export class FormSignUp {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  private authService = inject(AuthService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlert = inject(SweetAlertService);
  private emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['', Validators.required],
      role: ['']
    })
  }

  protected submitForm(): void {
    this.toastrService.clear();
    this.formSubmitted = true;

    if(this.form.valid) {
      document.getElementById('register-btn')!.setAttribute('disabled', 'true');
      document.getElementById('register-btn')!.classList.add('disabled');

      this.form.patchValue({
        role: {
          id: 3,
          name: 'ROLE_APPLICANT'
        }
      });

      setTimeout(() => {
        this.authService.register(this.form.value).subscribe({
          next: (res) => {
            this.sweetAlert.redirect('Great!', res.message + '. Try to login!', '/login');
          },
          error: (err) => {
            if(err.status === 409 && err.error.error)
              this.toastrService.showError('Error', err.error.error);
            else 
              this.toastrService.showError('Error', 'Something went wrong during registration');

            document.getElementById('register-btn')!.removeAttribute('disabled');
            document.getElementById('register-btn')!.classList.remove('disabled');
          }
        });

        this.formSubmitted = false;
      }, 1500);      
    }
  }
}
