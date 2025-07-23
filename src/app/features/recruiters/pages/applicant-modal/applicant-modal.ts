import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Applicants } from "../applicants/applicants";
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-applicant-modal',
  imports: [
    MatDialogModule,
    Applicants,
    MatTooltip
  ],
  templateUrl: './applicant-modal.html',
  styleUrl: './applicant-modal.css'
})

export class ApplicantModal {
  protected data = inject(MAT_DIALOG_DATA);
}
