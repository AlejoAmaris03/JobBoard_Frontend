import { Component, Input } from '@angular/core';
import { JobPostModel } from '../../core/models';

@Component({
  selector: 'app-job-board-card',
  imports: [],
  templateUrl: './job-board-card.html',
  styleUrl: './job-board-card.css'
})

export class JobBoardCard {
  @Input() job!: JobPostModel;
}
