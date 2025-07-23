import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ApplicationModel, UserModel } from '../../../../core/models';
import { ApplicationService, AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { ApplicationCard } from '../../components/application-card/application-card';
import { NoApplicationsMessage } from '../../components/no-applications-message/no-applications-message';

@Component({
  selector: 'app-jobs-applied',
  imports: [
    ApplicationCard,
    NoApplicationsMessage
  ],
  templateUrl: './jobs-applied.html',
  styleUrl: './jobs-applied.css'
})

export default class JobsApplied implements OnInit {
  @Output() onGetApplications = new EventEmitter<any>();
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
    this.applicationService.getApplicationByApplicantId(this.applicant.id).subscribe({
      next: (res) => {
        this.applications = res.applications;
        this.onGetApplications.emit();
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
