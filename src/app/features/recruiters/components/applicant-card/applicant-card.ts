import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationModel } from '../../../../core/models';

@Component({
  selector: 'app-applicant-card',
  imports: [],
  templateUrl: './applicant-card.html',
  styleUrl: './applicant-card.css'
})

export class ApplicantCard {
  @Input() application!: ApplicationModel;
  @Output() onChangeStatus = new EventEmitter<{ applicationId: number, newStatus: any }>();

  protected formatDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleDateString('default', { month: 'long' });

    return `${monthName} ${day}, ${year}`;
  }
}
