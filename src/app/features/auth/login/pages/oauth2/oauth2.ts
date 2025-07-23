import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth2',
  imports: [],
  templateUrl: './oauth2.html',
  styleUrl: './oauth2.css'
})

export default class OAuth2 implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginWithOAuth2();
  }

  public loginWithOAuth2() {
    const token = this.route.snapshot.queryParamMap.get('token');
    
    if(token) {
      if(typeof window !== 'undefined')
        localStorage.setItem('token', token);

      const userRole = JSON.parse(atob(token!.split('.')[1])).role;
      
      if(userRole === 'ROLE_ADMIN')
        this.router.navigate(['/admin']);
      else if(userRole === 'ROLE_RECRUITER')
        this.router.navigate(['/recruiter']);
      else if(userRole === 'ROLE_APPLICANT')
        this.router.navigate(['/applicant']);
    }
    else
      this.router.navigate(['/login']);
  }
}
