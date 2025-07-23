import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService, AuthService, SweetAlertService, ToastrNotificationService, JobPostsService, ApplicationService } from '../../../../core/services';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export default class HomePage implements OnInit {
  protected stats = {
    totalUsers: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0
  };
  private cdr = inject(ChangeDetectorRef);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService); 
  private applicationService = inject(ApplicationService); 
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private jobPostService = inject(JobPostsService);
  private userLoggedInId = this.authService.getUserLoggedIn().id;

  ngOnInit(): void {
    this.setStats();
  }

  private setStats(): void {
    this.getTotalUsers();
    this.getJobPost();
    this.getActiveApplications();
  }

  private getActiveApplications() {
    this.applicationService.getApplicationsByStatus(2).subscribe({
      next:(res) => {
        this.stats.totalApplications = res.applications.length;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while fetching users');
      }
    });
  }

  private getJobPost() {
    this.jobPostService.getJobPost('').subscribe({
      next:(res) => {
        this.stats.totalJobs = res.totalElements;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while fetching users');
      }
    });
  }

  private getTotalUsers(): void {
    this.userService.getAllUsers(this.userLoggedInId).subscribe({
      next:(users) => {
        this.stats.totalUsers = users.length;
        this.stats.totalRecruiters = users.filter(user => user.role === 'RECRUITER').length;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while fetching users');
      }
    });
  }
}
