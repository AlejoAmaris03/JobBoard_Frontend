import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})

export class ResetPassword {
  protected form!: FormGroup;
  private fb = inject(FormBuilder);
}
