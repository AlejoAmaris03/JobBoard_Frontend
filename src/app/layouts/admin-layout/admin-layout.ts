import { AfterViewInit, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { Navbar, Sidebar } from "../../shared";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../core/services';
import { UserAuth } from '../../core/models';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [
    Navbar,
    MatSidenavModule,
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})

export default class AdminLayout  implements AfterViewInit{
  @ViewChild(MatSidenav) sidebar!: MatSidenav;
  protected cdr = inject(ChangeDetectorRef);
  protected userLoggeedIn: UserAuth = new AuthService().getUserLoggedIn();
  protected options = [
    {
      name: 'Home',
      link: '/admin/home',
      icon: 'fa-solid fa-home'
    },
    {
      name: 'Users',
      link: '/admin/users',
      icon: 'fa-solid fa-users'
    },
    {
      name: 'Companies',
      link: '/admin/companies',
      icon: 'fa-solid fa-building'
    }
  ];

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
