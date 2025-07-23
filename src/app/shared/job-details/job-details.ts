import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { JobPostModel } from '../../core/models';
import { DecimalPipe } from '@angular/common';
import { ApplicationService, AuthService, CompanyService, SweetAlertService, ToastrNotificationService } from '../../core/services';
import { MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { JobDetailsModal } from '../job-details-modal/job-details-modal';

@Component({
  selector: 'app-job-details',
  imports: [
    DecimalPipe
  ],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})

export class JobDetails implements OnChanges {
  @Input() dialogRef?: MatDialogRef<JobDetailsModal>;
  @Input() updateApplyBtn?: number;
  @Input() jobSelected!: JobPostModel;
  @Output() onDialogOpen = new EventEmitter<any>();
  @Output() onDialogNotOpen = new EventEmitter<any>();
  protected company!: any;
  protected applied: boolean = false;
  private authService = inject(AuthService);
  private companyService = inject(CompanyService);
  private applicationService = inject(ApplicationService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlertService = inject(SweetAlertService);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['jobSelected']?.currentValue) {
      this.getCompanyInfo();
      
      if(this.authService.isAuthenticated() && this.authService.getUserLoggedIn()?.role === 'ROLE_APPLICANT')
        this.getUserApplication();
    }

    if(changes['updateApplyBtn']?.currentValue) {
      if(!this.dialogRef)
        this.getUserApplication();
    }
  }

  protected parseDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const yearNumber = date.getFullYear();
    const monthName = date.toLocaleDateString('default', { month: 'long' });
    const dayNumber = date.getDate();

    return `${dayNumber} ${monthName}, ${yearNumber}`;
  }

  protected getImage(companyId: number): any {
    const image = this.companyService.getImageById(companyId);
    
    if(this.company?.imageName)
      return image;

    return 'assets/images/no-logo.jpg';
  }

  protected redirectToLogin(jobSelected: JobPostModel) {
    if(this.authService.isAuthenticated() && this.authService.getUserLoggedIn()?.role === 'ROLE_APPLICANT') {
      if(this.dialogRef && this.dialogRef?.getState() === MatDialogState.OPEN)
        this.onDialogOpen.emit(jobSelected);
      else
        this.onDialogNotOpen.emit(jobSelected);
    }
    else 
      window.location.href = "/login";
  }

  private getCompanyInfo() {
    this.companyService.getCompanyByName(this.jobSelected?.companyName).subscribe({
      next: (res) => {
        this.company = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.status === 401 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else 
          this.toastrService.showError('Error', 'Something went wrong fetching companies');
      }
    })
  }

  private getUserApplication() {
    this.applied = false;
    const applicantId = this.authService.getUserLoggedIn().id;

    this.applicationService.getApplicationByUserIdAndJobId(applicantId, this.jobSelected.id).subscribe({
      next: (res) => {
        if(res.application) {
          this.applied = true;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        if(err.status === 401 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'Something went wrong fetching companies');
      }
    });
  }
}
