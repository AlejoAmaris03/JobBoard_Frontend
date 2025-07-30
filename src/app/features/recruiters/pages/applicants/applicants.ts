import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApplicationModel, JobPostModel } from '../../../../core/models';
import { ApplicationService, AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { ApplicantCard } from '../../components/applicant-card/applicant-card';

@Component({
  selector: 'app-applicants',
  imports: [
    ApplicantCard
  ],
  templateUrl: './applicants.html',
  styleUrl: './applicants.css'
})

export class Applicants implements OnChanges { 
  @Input() jobSelected!: JobPostModel;
  protected applicants: ApplicationModel[] = [];
  private applicationService = inject(ApplicationService);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlertService = inject(SweetAlertService);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['jobSelected'].currentValue)
      this.getApplicantsByJob();
  }

  protected handleChangeStatus(event: { applicationId: number, newStatus: any }) {
    this.toastrService.clear();
    const status: number = Number((event.newStatus.target as HTMLInputElement).value)

    this.applicationService.updateStatus(event.applicationId, status).subscribe({
      next: (res) => {
        this.toastrService.showSuccess('Great!', res.message);
      },
      error: (err) => this.showErrors(err)
    });
  } 

  private getApplicantsByJob() {
    this.applicationService.getApplicantsByJobId(this.jobSelected.id).subscribe({
      next: (res) => {
        this.applicants = res.applications;
        this.cdr.detectChanges();
      },
      error: (err) => this.showErrors(err)
    });
  }

  private showErrors(err: any) {
    if(err.status === 400 && err.error.error)
      this.toastrService.showError('Error', err.error.error);
    else if(!this.authService.isAuthenticated())
      this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
    else 
      this.toastrService.showError('Error', 'An error occurred while fetching applications');
  }
}
