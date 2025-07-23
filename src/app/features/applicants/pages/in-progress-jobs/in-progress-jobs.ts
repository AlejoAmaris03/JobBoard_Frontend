import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApplicationModel, UserModel } from '../../../../core/models';
import { ApplicationService, AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { ApplicationCard } from '../../components/application-card/application-card';
import { NoApplicationsMessage } from "../../components/no-applications-message/no-applications-message";

@Component({
  selector: 'app-in-progress-jobs',
  imports: [
    ApplicationCard,
    NoApplicationsMessage
],
  templateUrl: './in-progress-jobs.html',
  styleUrl: './in-progress-jobs.css'
})

export default class InProgressJobs implements OnInit {
  protected applications: ApplicationModel[] = [];
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private toastr = inject(ToastrNotificationService);
  private sweetAlert = inject(SweetAlertService);
  private cdr = inject(ChangeDetectorRef);
  private applicant: UserModel = this.authService.getUserLoggedIn();

  ngOnInit(): void {
    this.getApplications();
  }

  protected handleCancelation() {
    this.getApplications();
  }

  private getApplications() {
    this.applicationService.getApplicationsByApplicantIdAndStatus(this.applicant.id, 1).subscribe({
      next: (res) => {
        this.applications = res.applications;
        this.cdr.detectChanges();
      },
      error: (err) => this.showErrors(err)
    })
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
