import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { JobPostModel } from '../../../../core/models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-job-details',
  imports: [
    MatDialogModule,
    MatTooltip,
    DecimalPipe
  ],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})

export class JobDetails {
  protected data = inject<JobPostModel>(MAT_DIALOG_DATA);

  protected parseDate(dateString: string) {
    const [ year, month, day ] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const newDay = date.getDate();
    const newMonth = date.toLocaleDateString('default', { month: 'long' });
    const newYear = date.getFullYear();

    return `${newDay} ${newMonth}, ${newYear}`;
  }
}
