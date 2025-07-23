import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from "@angular/cdk/layout";
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-public-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    MatTooltipModule
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css'
})

export default class PublicLayout implements AfterViewInit {
  protected showIcons: boolean = false;
  private cdr = inject(ChangeDetectorRef);
  private observer = inject(BreakpointObserver);

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 420px)']).subscribe(res => {
      if(res.matches)
        this.showIcons = true;
      else
        this.showIcons = false;

      this.cdr.detectChanges();
    });
  }
}
