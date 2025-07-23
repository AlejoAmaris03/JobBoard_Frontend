import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuth } from '../../core/models';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})

export class Sidebar {
  @Input() sidebar?: MatSidenav;
  @Input() userLoggedIn!: UserAuth;
  @Input() options = [{
      name: '',
      link: '',
      icon: ''
    }
  ];
}
