import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthService, SweetAlertService } from '../../core/services';
import { MatSidenav } from '@angular/material/sidenav';
import { UserAuth } from '../../core/models';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatTooltip,
    MatMenuModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar {
  @Input() sidebar?: MatSidenav;
  @Input() userLoggedIn!: UserAuth;
  private authService = inject(AuthService);
  private sweetAlert = inject(SweetAlertService);
  private router = inject(Router);

  protected goToProfile() {
    const routes = {
      'ROLE_ADMIN': '/admin/profile',
      'ROLE_RECRUITER': '/recruiter/profile',
      'ROLE_APPLICANT': '/applicant/profile',
    }
    const role = this.authService.getUserLoggedIn().role as keyof typeof routes;

    this.router.navigate([routes[role]]);
  }

  protected logout() {
    this.authService.logout();
    this.sweetAlert.loadingAndRedirect('Logging out', 'Please wait while we log you out...', '/');
  }
}
