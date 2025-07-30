import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApplicantCVModel, ApplicantProfileImageModel, ExperienceModel, ResumeModel, UserModel } from '../../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ResumeService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-applicant-resume',
  imports: [
    MatTooltip
  ],
  templateUrl: './applicant-resume.html',
  styleUrl: './applicant-resume.css'
})

export default class ApplicantResume implements OnInit {
  protected cv!: ApplicantCVModel;
  protected resume!: ResumeModel;
  protected profileImage!: ApplicantProfileImageModel;
  protected experience: ExperienceModel[] = [];
  protected applicant!: UserModel;
  private route = inject(ActivatedRoute);
  private resumeService = inject(ResumeService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlertService = inject(SweetAlertService);
  private authService = inject(AuthService);
  private applicantId: number = Number(this.route.snapshot.paramMap.get('applicantId'));
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.resumeService.getFullResumeByApplicantId(this.applicantId).subscribe({
      next: (res) => {
        this.applicant = res.applicant;
        this.cv = res.cv;
        this.resume = res.resume;
        this.profileImage = res.profileImage;
        this.experience = res.experience;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while fetching resume info.');
      }
    })
  }

  protected formatDate(dateString: string): string {
    const [year, month] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1);
    const monthName = date.toLocaleDateString('default', { month: 'long' });

    return `${monthName} ${year}`;
  }
}
