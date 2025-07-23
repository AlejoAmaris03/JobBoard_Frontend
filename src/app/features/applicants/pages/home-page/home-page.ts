import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { JobPostModel, UserModel } from '../../../../core/models';
import { ApplicationService, AuthService, JobPostsService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsModal } from '../../../../shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export default class HomePage {
  protected jobs: JobPostModel[] = [];
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private jobService = inject(JobPostsService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService);
  private cdr = inject(ChangeDetectorRef); 
  private dialog = inject(MatDialog);
  protected applicant: UserModel = this.authService.getUserLoggedIn();

  ngOnInit(): void {
    this.getJobs();
  }

  protected viewDetails(job: JobPostModel): void {
    const dialogRef = this.dialog.open(JobDetailsModal, {
      data: job,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '250ms',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((jobSelected: JobPostModel | undefined) => {
      if(jobSelected)
        this.saveJob(jobSelected);
    });
  }

  protected formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleDateString('default', { month: 'long' });

    return `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
  }

  private getJobs() {
    const pagination = 'page=1&size=6';

    this.jobService.getJobPost(pagination).subscribe({
      next: (res) => {
        this.jobs = res.jobs;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.showErrors(err);
      }
    });
  }

  private saveJob(jobSelected: JobPostModel) {
    const applicant: any = {
      id: this.applicant.id,
      name: this.applicant.name,
      surname: this.applicant.surname,
      email: this.applicant.email
    };

    const job: any = {
      id: jobSelected.id,
      name: jobSelected.name,
      description: jobSelected.description
    };

    const application: any = {
      id: '',
      user: applicant,
      job: job
    }

    this.applicationService.saveApplication(application).subscribe({
      next: (res) => {
        this.toastrService.showSuccess("Great!", res.message);
      },
      error: (err) => {
        this.showErrors(err);
      }
    })
  }

  private showErrors(err: any) {
    if(err.status === 400 && err.error.error)
      this.toastrService.showError('Error', err.error.error);
    else if(!this.authService.isAuthenticated())
      this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
    else 
      this.toastrService.showError('Error', 'An error occurred while fetching companies');
  }
}
