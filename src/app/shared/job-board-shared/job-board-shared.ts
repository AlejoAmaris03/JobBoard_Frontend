import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { JobPostsService, ToastrNotificationService } from '../../core/services';
import { JobPostModel } from '../../core/models'; 
import { JobBoardCard } from '../job-board-card/job-board-card'; 
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { JobDetails, JobDetailsModal } from '../';

@Component({
  selector: 'app-job-board-shared',
  imports: [
    JobBoardCard,
    JobDetails
  ],
  templateUrl: './job-board-shared.html',
  styleUrl: './job-board-shared.css'
})

export class JobBoardShared implements OnInit, OnChanges {
  @Input() afterApply?: number;
  @Output() onApplying = new EventEmitter<any>();
  protected updateApplyBtn: number = 0;
  protected jobs: JobPostModel[] = [];
  protected jobSelected!: JobPostModel;
  protected page: number = 1;
  protected size: number = 5;
  protected totalPages: number  = 0;
  protected totalElements: number  = 0;
  protected isPreviousPage: boolean  = false;
  protected isNextPage: boolean  = false;
  protected filterQuery: string = '';
  private jobPostService = inject(JobPostsService);
  private toastrService = inject(ToastrNotificationService);
  private isFiltering: boolean = false;
  private observer = inject(BreakpointObserver);
  private dialog = inject(MatDialog);
  private isMobileView: boolean = false;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadJobs();

    this.observer.observe(['(max-width: 1024px)']).subscribe(result => {
      this.isMobileView = result.matches;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['afterApply']?.currentValue) {
      this.updateApplyBtn = Number(changes['afterApply']?.currentValue);
      this.cdr.detectChanges();
    }
  }

  public handleApplying(jobPostService: JobPostModel) {
    this.onApplying.emit(jobPostService);
  }

  protected onPreviewPage() {
    if(this.isPreviousPage) {
      this.page--;
      this.loadJobs();
    }
  }

  protected onNextPage() {
    if(this.isNextPage) {
      this.page++;
      this.loadJobs();
    }
  }

  protected filterData(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.filterQuery = query;
    this.page = 1;
    this.isFiltering = !!query;
    this.loadJobs();
  }

  protected selecJob(job: JobPostModel) {
    this.jobSelected = job;

    if(this.isMobileView) {
      const dialogRef = this.dialog.open(JobDetailsModal, {
        data: this.jobSelected,
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '250ms',
        width: '600px'
      });

      dialogRef.afterClosed().subscribe((job: JobPostModel | undefined) => {
        if(job)
          this.onApplying.emit(job);
      });
    }

    this.cdr.detectChanges();
  }

  private loadJobs() {
    const pagination = `page=${this.page}&size=${this.size}${this.filterQuery ? `&query=${this.filterQuery}` : ''}`;

    const fetchJob = this.isFiltering
      ? this.jobPostService.filterJobs(pagination)
      : this.jobPostService.getJobPost(pagination);

    fetchJob.subscribe({
      next: (res) => {
        this.jobs = res.jobs;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.isPreviousPage = res.previousPage;
        this.isNextPage = res.nextPage;
        this.jobSelected = this.jobs[0];
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.status === 401 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else 
          this.toastrService.showError('Error', 'Something went wrong fetching jobs');
      }
    })
  }
}
