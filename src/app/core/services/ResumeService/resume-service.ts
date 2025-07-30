import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { ResumeModel } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ResumeService {
  private resumeUrl = `${API.baseUrl}/resumes`;
  private http = inject(HttpClient);

  public getResumeByApplicantId(id: number): Observable<any>  {
    return this.http.get<any>(`${this.resumeUrl}/byApplicantId/${id}`);
  }

  public getFullResumeByApplicantId(id: number): Observable<any>  {
    return this.http.get<any>(`${this.resumeUrl}/full-resume/${id}`);
  }

  public saveResumeInfo(resume: ResumeModel): Observable<any> {
    return this.http.post<any>(`${this.resumeUrl}/save-resume`, resume);
  }

  public saveProfileDescription(resume: ResumeModel): Observable<any> {
    return this.http.post<any>(`${this.resumeUrl}/save-profile-description`, resume);
  }
}
