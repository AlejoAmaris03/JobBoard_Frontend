import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService, JobPostsService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { JobPostModel } from '../../../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { JobDetails } from '../../components/job-details/job-details';

@Component({
  selector: 'app-manage-jobs',
  imports: [
    RouterLink,
    MatTooltip
  ],
  templateUrl: './manage-jobs.html',
  styleUrl: './manage-jobs.css'
})

export default class ManageJobs implements OnInit {
  protected jobPosts: JobPostModel[] = [];
  protected page: number = 1;
  protected totalPages: number = 0;
  protected totalElements: number = 0;
  protected elementsPerPage: number = 0;
  protected size: number = 5;
  protected nextPage:boolean = false;
  protected previousPage: boolean = false;
  private jobPostService = inject(JobPostsService);  
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService); 
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);  
  private isFiltering: boolean = false;
  private filterQuery: string = '';
  private recruiterLoggedIn = this.authService.getUserLoggedIn();
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.laodJobs();
  }

  protected parseDate(dateString: string) {
    const [ year, month, day ] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const newDay = date.getDate();
    const newMonth = date.toLocaleDateString('default', { month: 'long' });
    const newYear = date.getFullYear();

    return `${newDay} ${newMonth}, ${newYear}`;
  }

  protected filterJobs(event: Event) {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filterQuery = input;
    this.page = 1;
    this.isFiltering = !!input;
    this.laodJobs();
  }

  protected jobDetails(job: JobPostModel) {
    this.dialog.open(JobDetails, {
      data: job,
      width: '700px'
    });
  }

  async deleteJob(jobId: number) {
    this.toastrService.clear();

    const result = await this.sweetAlertService.showConfirmationAndExecute(
      'You will delete a job',
      "You won't be able to revert this!",
      'Yes, deleted'
    );

    if(!result.isConfirmed) 
      return;

    this.jobPostService.deleteJob(jobId).subscribe({
      next:(res) => {
        if(this.jobPosts.length === 1 && this.page > 1) {
          this.page--;
          this.cdr.detectChanges();
        }

        this.toastrService.showSuccess('Great!', res.message);
        this.laodJobs();
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while deleting companies');
      }
    });
  }

  protected onPreviewPage() {
    if(this.previousPage) {
      this.page--;
      this.laodJobs();
    }
  }

  protected onNextPage() {
    if(this.nextPage) {
      this.page++;
      this.laodJobs();
    }
  }

  private laodJobs() { 
    const pagination = `page=${this.page}&size=${this.size}${this.filterQuery ? `&query=${this.filterQuery}` : '' }`;

    const jobFetch = this.isFiltering
      ? this.jobPostService.filterJobsByRecruiterId(this.recruiterLoggedIn.id, pagination)
      : this.jobPostService.getJobPostByRecruiterId(this.recruiterLoggedIn.id, pagination);

    jobFetch.subscribe({
      next:(res) => {
        this.jobPosts = res.jobs;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.elementsPerPage = res.elementsPerPage;
        this.nextPage = res.nextPage;
        this.previousPage = res.previousPage;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while fetching companies');
      }
    });
  }
}
