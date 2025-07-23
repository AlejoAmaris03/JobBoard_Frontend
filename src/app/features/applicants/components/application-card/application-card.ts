import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ApplicationModel, JobPostModel } from '../../../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsModal } from '../../../../shared';
import { ApplicationService, AuthService, JobPostsService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';

@Component({
  selector: 'app-application-card',
  imports: [
  ],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})

export class ApplicationCard {
  @Input() job!: ApplicationModel;
  @Input() applicationNumber!: number;
  @Output() onCancelApplication = new EventEmitter<any>();
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private toastr = inject(ToastrNotificationService);
  private sweetAlert = inject(SweetAlertService);
  private jobPostService = inject(JobPostsService);
  private dialog = inject(MatDialog);

  protected getApplicationInfo() {
    this.jobPostService.getJobPostByName(this.job.jobName).subscribe({
      next: (res) => {
        this.dialog.open(JobDetailsModal, {
          data: res,
          width: '600px'
        });
      },
      error: (err) => this.showErrors(err)
    }); 
  }

  async cancelApplication() {
    this.toastr.clear();
    
    const res = await this.sweetAlert.showConfirmationAndExecute(
      'You will cancel the application',
      'This action cannot be undone',
      'Yes, cancel it'
    );

    if(!res.isConfirmed)
      return;

    this.applicationService.deleteApplication(this.job.id).subscribe({
      next: (res) => {
        this.onCancelApplication.emit();
        this.toastr.showSuccess('Great!', res.message);
      },
      error: (err) => this.showErrors(err)
    });
  }

  protected formatDate(dateString: string) {
    const [ year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleDateString('default', { month: 'long' });

    return `${monthName} ${day}, ${year}`;
  }

  private showErrors(err: any) {
    if(err.status === 400 && err.error.error)
      this.toastr.showError('Error', err.error.error);
    else if(!this.authService.isAuthenticated())
      this.sweetAlert.sessionExpired('Session Expired', 'Please login again to continue');
    else 
      this.toastr.showError('Error', 'An error occurred while fetching companies');
  }
}
