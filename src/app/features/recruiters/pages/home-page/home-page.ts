import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export default class HomePage {
  private authService = inject(AuthService);
  protected userLoggedIn = this.authService.getUserLoggedIn();
}
