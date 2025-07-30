import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApplicantCvService, ApplicantProfileImageService, AuthService, ExperienceService, 
  ResumeService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { MatIcon } from '@angular/material/icon';
import { ApplicantCVModel, ApplicantProfileImageModel, ExperienceModel, ResumeModel, UserModel } from '../../../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { CvAttachedModal, ExperienceModal, ProfileDescriptionModal, ResumeModal } from '../../components';

@Component({
  selector: 'app-applicant-profile',
  imports: [
    MatIcon
  ],
  templateUrl: './applicant-profile.html',
  styleUrl: './applicant-profile.css'
})

export default class ApplicantProfile implements OnInit {
  protected cv!: ApplicantCVModel;
  protected profileImage!: ApplicantProfileImageModel;
  protected experience: ExperienceModel[] = [];
  protected resume!: ResumeModel;
  private authService = inject(AuthService);
  private cvService = inject(ApplicantCvService);
  private profileImageService = inject(ApplicantProfileImageService);
  private experienceService = inject(ExperienceService);
  private resumeService = inject(ResumeService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  protected userLoggedIn: UserModel = this.authService.getUserLoggedIn();
  
  ngOnInit(): void {
    this.getResumeInfo();
    this.getExperienceInfo();
    this.getCvFile();
    this.getProfileImage();
  }

  protected changeProfileImage(event: Event) {
    this.toastrService.clear();

    const allowedFileTypes = ['png', 'jpeg', 'webp', 'svg'];
    const image = (event.target as HTMLInputElement);
    const formData = new FormData;
    const applicant: any = {
      id: this.userLoggedIn.id,
      name: this.userLoggedIn.name,
      surname: this.userLoggedIn.surname,
      email: this.userLoggedIn.email
    };

    formData.append('applicant', new Blob(
      [JSON.stringify(applicant)],
      { type: 'application/json' }
    ));
    
    if(image.files && image.files.length > 0) {
      const imageType = image.files[0].type;

      if(!allowedFileTypes.includes(imageType.split('/')[1].toString())) {
        this.toastrService.showError('Error', 'Picture format not valid');
        return;
      }

      formData.append('profileImage', image.files[0]);

      this.profileImageService.saveProfileImage(formData).subscribe({
        next: (res) => {
          this.getProfileImage();
          this.toastrService.showSuccess('Great!', res.message);
        },
        error: (err) => this.showErrors(err, 'An error occurred while saving profile image.')
      });
    }
  }

  protected changeCvFile(event: Event) {
    this.toastrService.clear();

    const allowedFileTypes = ['pdf'];
    const image = (event.target as HTMLInputElement);
    const formData = new FormData;
    const applicant: any = {
      id: this.userLoggedIn.id,
      name: this.userLoggedIn.name,
      surname: this.userLoggedIn.surname,
      email: this.userLoggedIn.email
    };

    formData.append('applicant', new Blob(
      [JSON.stringify(applicant)],
      { type: 'application/json' }
    ));
    
    if(image.files && image.files.length > 0) {
      const imageType = image.files[0].type;

      if(!allowedFileTypes.includes(imageType.split('/')[1].toString())) {
        this.toastrService.showError('Error', 'CV format not valid');
        return;
      }

      formData.append('cv', image.files[0]);

      this.cvService.saveCV(formData).subscribe({
        next: (res) => {
          this.getCvFile();
          this.toastrService.showSuccess('Great!', res.message);
        },
        error: (err) => this.showErrors(err, 'An error occurred while saving cv file.')
      });
    }
  }

  protected openResumeModal() {
    const dialogRef = this.dialog.open(ResumeModal, {
      data: this.resume,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if(result)
        this.getResumeInfo();
    });
  }

  protected openProfileDescriptionModal() {
    const dialogRef = this.dialog.open(ProfileDescriptionModal, {
      data: this.resume,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if(result)
        this.getResumeInfo();
    });
  }

  protected openExperienceModal(experience: ExperienceModel | null) {
    const dialogRef = this.dialog.open(ExperienceModal, {
      data: experience,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if(result)
        this.getExperienceInfo();
    });
  }

  protected openCvModal() {
    const dialogRef = this.dialog.open(CvAttachedModal, {
      data: this.cv,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if(result)
        this.getCvFile();
    });
  }

  protected formatDate(dateString: string): string {
    const [year, month] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1);
    const monthName = date.toLocaleDateString('default', { month: 'long' });

    return `${monthName} ${year}`;
  }

  private getResumeInfo() {
    this.resumeService.getResumeByApplicantId(this.userLoggedIn.id).subscribe({
      next: (res) => {
        this.resume = res.resume;
        this.cdr.detectChanges();
      },
      error: (err) => this.showErrors(err, 'An error occurred while fetching the resume.')
    });
  }

  private getExperienceInfo() {
    this.experienceService.getExperienceByApplicantId(this.userLoggedIn.id).subscribe({
      next: (res) => {
        this.experience = res.experience;
        this.cdr.detectChanges();
      },
      error: (err) => this.showErrors(err, 'An error occurred while fetching the experience.')
    });
  }

  private getCvFile() {
    this.cvService.getCvByApplicantId(this.userLoggedIn.id).subscribe({
      next: (res) => {
        this.cv = res.cv;
        this.cdr.detectChanges();
      },
      error: (err) => this.showErrors(err, 'An error occurred while fetching the CV file.')
    });
  }

  private getProfileImage() {
    this.profileImageService.getProfileImageByApplicantId(this.userLoggedIn.id).subscribe({
      next: (res) => {
        this.profileImage = res.profileImage;
        this.cdr.detectChanges();
      },
      error: (err) => this.showErrors(err, 'An error occurred while fetching the profile image.')
    });
  }

  private showErrors(err: any, message: string) {
    if(err.status === 400 && err.error.error)
      this.toastrService.showError('Error', err.error.error);
    else if(!this.authService.isAuthenticated())
      this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
    else 
      this.toastrService.showError('Error', message);
  }
}
