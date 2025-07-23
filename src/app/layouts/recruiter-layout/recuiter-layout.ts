import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { UserAuth } from '../../core/models';
import { AuthService } from '../../core/services';
import { Navbar, Sidebar } from '../../shared';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recuiter-layout',
  imports: [
    Navbar,
    MatSidenavModule,
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './recuiter-layout.html',
  styleUrl: './recuiter-layout.css'
})

export default class RecuiterLayout {
  @ViewChild(MatSidenav) sidebar!: MatSidenav;
  protected cdr = inject(ChangeDetectorRef);
  protected userLoggeedIn: UserAuth = new AuthService().getUserLoggedIn();
  protected options = [
    {
      name: 'Home',
      link: '/recruiter/home',
      icon: 'fa-solid fa-home'
    },
    {
      name: 'Candidates',
      link: '/recruiter/candidates',
      icon: 'fa-solid fa-users'
    },
    {
      name: 'Post jobs',
      link: '/recruiter/post-jobs',
      icon: 'fa-solid fa-briefcase'
    },
    {
      name: 'Manage jobs',
      link: '/recruiter/manage-jobs',
      icon: 'fa-solid fa-tasks'
    }
  ];

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
