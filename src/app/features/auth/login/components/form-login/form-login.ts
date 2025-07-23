import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, SweetAlertService, ToastrNotificationService } from '../../../../../core/services/';
import { API } from '../../../../../../environment';
import { Oauth2Google } from "../../../../../shared/oauth2-google/oauth2-google";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-login',
  imports: [
    ReactiveFormsModule,
    Oauth2Google,
    RouterLink
],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css'
})

export class FormLogin implements OnInit {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  protected showPassword: boolean = false;
  protected environment = API;
  private authService = inject(AuthService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlert = inject(SweetAlertService);
  private emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['', Validators.required]
    })
  }

  protected submitForm(): void {
    this.toastrService.clear();
    this.formSubmitted = true;

    if(this.form.valid) {
      document.getElementById('login-btn')!.setAttribute('disabled', 'true');
      document.getElementById('login-btn')!.classList.add('disabled');

      setTimeout(() => {
        this.authService.login(this.form.value).subscribe({
          next: () => {
            const userRole = this.authService.getUserLoggedIn()!.role;
            let route = '';

            if(userRole === 'ROLE_ADMIN')
              route = '/admin';
            else if(userRole === 'ROLE_RECRUITER')
              route = '/recruiter';
            else if(userRole === 'ROLE_APPLICANT')
              route = '/applicant';

            this.sweetAlert.redirect('Great!', 'You are logged in!', route);
          },
          error: (err) => {
            if(err.status === 401 && err.error.error)
              this.toastrService.showError('Error', err.error.error);
            else 
              this.toastrService.showError('Error', 'Something went wrong during authentication');

            document.getElementById('login-btn')!.removeAttribute('disabled');
            document.getElementById('login-btn')!.classList.remove('disabled');
          }
        });

        this.formSubmitted = false;
      }, 1500);
    }
  }

  protected showOrHidePassword() {
    this.showPassword = !this.showPassword;
    this.cdr.detectChanges();
  }
}
