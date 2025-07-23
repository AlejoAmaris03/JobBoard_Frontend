import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, SweetAlertService, ToastrNotificationService, UserService } from '../../../../../core/services';

@Component({
  selector: 'app-send-email',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './send-email.html',
  styleUrl: './send-email.css'
})

export default class SendEmail implements OnInit {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  private userService = inject(UserService);
  private emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  private fb = inject(FormBuilder);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlert = inject(SweetAlertService);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]]
    });
  }

  protected sendEmail() {
    this.formSubmitted = true;

    if(this.form.valid) {
      this.userService.sendEmail(this.form.value).subscribe({
        next: (res) => {
          this.sweetAlert.redirect('Great!', res.message, '/login');
        },
        error: (err) => this.showErrors(err)
      });
    }
  }

  private showErrors(err: any) {
    if(err.status === 400 && err.error.error)
      this.toastrService.showError('Error', err.error.error);
    else 
      this.toastrService.showError('Error', 'Something went wrong sending the email');
  }
}
