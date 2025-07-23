import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { UserAuth } from '../../core/models';
import { AuthService } from '../../core/services';
import { Navbar, Sidebar } from '../../shared';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-applicant-layout',
  imports: [
    Navbar, 
    MatSidenav, 
    Sidebar, 
    RouterOutlet,
    MatSidenavModule
  ],
  templateUrl: './applicant-layout.html',
  styleUrl: './applicant-layout.css'
})

export default class ApplicantLayout {
  @ViewChild(MatSidenav) sidebar!: MatSidenav;
  protected cdr = inject(ChangeDetectorRef);
  protected userLoggeedIn: UserAuth = new AuthService().getUserLoggedIn();
  protected options = [
    {
      name: 'Home',
      link: '/applicant/home',
      icon: 'fa-solid fa-home'
    },
    {
      name: 'Jobs',
      link: '/applicant/jobs',
      icon: 'fa-solid fa-briefcase'
    },
    {
      name: 'My jobs',
      link: '/applicant/my-jobs',
      icon: 'fa-solid fa-bookmark'
    }
  ];

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
