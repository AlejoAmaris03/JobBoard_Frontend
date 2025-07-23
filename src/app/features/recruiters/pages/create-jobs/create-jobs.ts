import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, CompanyService, JobPostsService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { CompanyModel, UserModel } from '../../../../core/models';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-jobs',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-jobs.html',
  styleUrl: './create-jobs.css'
})

export default class CreateJobs implements OnInit {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  protected companies: CompanyModel[] = [];
  private companyService = inject(CompanyService);
  private jobPostService = inject(JobPostsService);
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService); 
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private jobId = Number(this.route.snapshot.paramMap.get('id'));
  private recruiterLoggedIn = this.authService.getUserLoggedIn();

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      company: ['', Validators.required],
      salary: ['', [
        Validators.required,
        Validators.min(100)
      ]],
      createdAt: [''],
      user: ['']
    });

    this.getCompanies();
  }

  protected submitForm() {
    this.toastrService.clear();
    this.formSubmitted = true;

    if(this.form.valid) {
      const user = {
        id: this.recruiterLoggedIn.id,
        name: this.recruiterLoggedIn.name,
        surname: this.recruiterLoggedIn.surname,
        email: this.recruiterLoggedIn.email
      };
      this.form.get('user')?.setValue(user);

      if(this.jobId)
        this.editJob();
      else 
        this.addJob();

      this.formSubmitted = false;
    }
  }

  private addJob() {
    this.jobPostService.saveJobPost(this.form.value).subscribe({
      next:(res) => {
        this.toastrService.showSuccess('Great!', res.message);
        this.clearForm();
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while saving job');
      }
    });
  }

  private editJob() {
    this.toastrService.clear();

    this.jobPostService.editJobPost(this.form.value).subscribe({
      next:(res) => {
        this.clearForm();
        this.sweetAlertService.redirect(
          'Great!',
          res.message + '. You will be redirected to view your changes.',
          '/recruiter/manage-jobs'
        );
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while editing job');
      }
    });
  }

  private getCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next:(companies) => {
        this.companies = companies;
        this.cdr.detectChanges();

        if(this.jobId)
          this.fillFormWithData();
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

  private fillFormWithData() {
    this.jobPostService.getJobPostById(this.jobId).subscribe({
      next:(job) => {
        this.form.patchValue({
          id: job.id,
          name: job.name,
          description: job.description,
          location: job.location,
          type: job.type,
          createdAt: job.createdAt,
          company: this.companies.find(c => c.name === job.companyName),
          salary: job.salary
        });
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

  private clearForm() {
    this.form.reset();
    this.form.get('company')?.setValue('');
  }
}
