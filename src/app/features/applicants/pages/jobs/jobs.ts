import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { JobBoardShared } from "../../../../shared/job-board-shared/job-board-shared";
import { JobPostModel, UserModel } from '../../../../core/models';
import { ApplicationService, AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';

@Component({
  selector: 'app-jobs',
  imports: [
    JobBoardShared
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css'
})

export default class Jobs {
  protected afterApply: number = 0;
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService);
  protected applicant: UserModel = this.authService.getUserLoggedIn();
  private cdr = inject(ChangeDetectorRef);

  public handleAplying(jobSelected: JobPostModel) {
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
        this.afterApply = res.application.id;
        this.cdr.detectChanges();
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
