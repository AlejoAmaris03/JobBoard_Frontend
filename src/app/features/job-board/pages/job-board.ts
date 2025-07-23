import { Component } from '@angular/core';
import { JobBoardShared } from "../../../shared/job-board-shared/job-board-shared";

@Component({
  selector: 'app-job-board',
  imports: [JobBoardShared],
  templateUrl: './job-board.html',
  styleUrl: './job-board.css'
})

export default class JobBoard {
}
