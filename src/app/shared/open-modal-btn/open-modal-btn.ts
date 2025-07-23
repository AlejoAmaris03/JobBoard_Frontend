import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-open-modal-btn',
  imports: [
    MatTooltip
  ],
  templateUrl: './open-modal-btn.html',
  styleUrl: './open-modal-btn.css'
})

export class OpenModalBtn {
  @Input() modalBtn = {
    name: '',
    icon: '',
    style: ''
  };
  @Output() onClick = new EventEmitter<any>();
}
