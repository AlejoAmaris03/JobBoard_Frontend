import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { JobDetails } from "../job-details/job-details";
import { MatTooltip } from '@angular/material/tooltip';
import { JobPostModel } from '../../core/models';

@Component({
  selector: 'app-job-details-modal',
  imports: [
    MatDialogModule,
    JobDetails,
    MatTooltip
  ],
  templateUrl: './job-details-modal.html',
  styleUrl: './job-details-modal.css'
})

export class JobDetailsModal {
  protected data = inject(MAT_DIALOG_DATA);
  protected dialogRef = inject(MatDialogRef<JobDetailsModal>);

  protected handleApplying(jobSelected: JobPostModel) {
    this.dialogRef.close(jobSelected);
  }
}
