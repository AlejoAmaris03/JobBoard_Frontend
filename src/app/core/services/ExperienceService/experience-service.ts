import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExperienceModel } from '../../models';

@Injectable({
  providedIn: 'root'
})

export class ExperienceService {
  private experienceUrl = `${API.baseUrl}/experiences`;
  private http = inject(HttpClient);

  public getExperienceByApplicantId(id: number): Observable<any> {
    return this.http.get<any>(`${this.experienceUrl}/byApplicantId/${id}`);
  }

  public saveExperience(experience: ExperienceModel): Observable<any> {
    return this.http.post<any>(`${this.experienceUrl}/save-experience`, experience);
  }

  public deleteExperience(experienceId: number): Observable<any> {
    return this.http.delete<any>(`${this.experienceUrl}/delete-experience/${experienceId}`);
  }
}
