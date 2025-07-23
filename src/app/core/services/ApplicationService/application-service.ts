import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationModel, JobPostModel } from '../../models';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  private applicationUrl = `${API.baseUrl}/applications`;
  private http = inject(HttpClient);

  public getApplicationByUserIdAndJobId(userId: number, jobId: number): Observable<any> {
    return this.http.get<any>(`${this.applicationUrl}/application?userId=${userId}&jobId=${jobId}`);
  }

  public getApplicationByApplicantId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.applicationUrl}/user/${userId}`);
  }

  public getApplicationsByRecruiterId(recruiterId: number): Observable<any> {
    return this.http.get<any>(`${this.applicationUrl}/recruiter/${recruiterId}/applications`);
  }

  public getApplicantsBJobId(jobId: number): Observable<any> {
    return this.http.get<any>(`${this.applicationUrl}/byJobId/${jobId}`);
  }

  public getApplicationsByStatus(status: number): Observable<any> {
    return this.http.get<any>(`${this.applicationUrl}/status?status=${status}`);
  }

  public getApplicationsByApplicantIdAndStatus(applicantId: number, status: number): Observable<any> {
    return this.http.get<any>(`${this.applicationUrl}/applicant/status?applicantId=${applicantId}&status=${status}`);
  }

  public saveApplication(application: ApplicationModel): Observable<any> {
    return this.http.post<any>(`${this.applicationUrl}/save`, application);
  }

  public updateStatus(applicationId: number, newStatus: number): Observable<any> {
    return this.http.put<any>(`${this.applicationUrl}/updateStatus?applicationId=${applicationId}&newStatus=${newStatus}`, null);
  }

  public deleteApplication(applicationId: number): Observable<any> {
    return this.http.delete<any>(`${this.applicationUrl}/delete/${applicationId}`);
  }
}
