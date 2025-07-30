import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, SweetAlertService, ToastrNotificationService, UserService } from '../../core/services';
@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule
],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})

export default class Profile implements OnInit {
  protected formSubmitted: boolean = false;
  protected form!: FormGroup;
  private emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService); 
  private userLoggedIn = this.authService.getUserLoggedIn();

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['']
    });

    this.getUserAuthInfo();
  }

  protected updateInfo() {
    this.formSubmitted = true;

    if(this.form.valid) {
      const formToSend = {...this.form.value};
      const token = this.authService.getToken();

      if(formToSend.password === '')
        delete formToSend.password;

      this.userService.updateProfile(formToSend, token).subscribe({
        next: (res) => {
          this.authService.setToken(res.tokenUpdated);
          this.sweetAlertService.showMessageAndReloadPage(
            'Information updated successfully!',
            'Reload the page to apply your changes',
            "success",
            "Reload"
          );
        },
        error: (err) => {
          if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
          else if(!this.authService.isAuthenticated())
            this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
          else 
            this.toastrService.showError('Error', 'An error occurred while updating info');
        }
      });
    }
  }

  private getUserAuthInfo() {
    this.form.patchValue({
      id: this.userLoggedIn.id,
      name: this.userLoggedIn.name,
      surname: this.userLoggedIn.surname,
      email: this.userLoggedIn.email
    });
  }
}
