import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApplicationService, AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { JobPostModel } from '../../../../core/models';
import { Applicants } from "../applicants/applicants";
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ApplicantModal } from '../applicant-modal/applicant-modal';

@Component({
  selector: 'app-candidates',
  imports: [Applicants],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css'
})

export default class Candidates implements OnInit {
  protected jobSelected!: JobPostModel;
  protected jobs: JobPostModel[] = [];
  protected applicationsPerJobNumber: any = [];
  protected totalApplications: number = 0;
  private applicationService = inject(ApplicationService);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlertService = inject(SweetAlertService);
  private cdr = inject(ChangeDetectorRef);
  private recruiter = this.authService.getUserLoggedIn();
  private dialog = inject(MatDialog);
  private observer = inject(BreakpointObserver);
  private isMobileView: boolean = false;

  ngOnInit(): void {
    this.getApplications();

    this.observer.observe(['(max-width: 1240px)']).subscribe(res => {
      this.isMobileView = res.matches;
    });
  }

  protected selectJob(job: JobPostModel) {
    this.jobSelected = job;

    if(this.isMobileView) {
      this.dialog.open(ApplicantModal, {
        data: this.jobSelected,
        width: '600px'
      });
    }

    this.cdr.detectChanges();
  }

  private getApplications() {
    this.applicationService.getApplicationsByRecruiterId(this.recruiter.id).subscribe({
      next: (res) => {
        this.jobs = res.jobs;
        this.applicationsPerJobNumber = res.applicationsPerJob;
        this.totalApplications = res.totalApplications;
        this.jobSelected = this.jobs[0];
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
