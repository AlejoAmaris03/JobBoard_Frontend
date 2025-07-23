import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPostModel } from '../../models';

@Injectable({
  providedIn: 'root'
})

export class JobPostsService {
  private jobUrl = `${API.baseUrl}/job-posts`;
  private http = inject(HttpClient);

  public getJobPost(pagination: any): Observable<any> {
    return this.http.get<JobPostModel[]>(`${this.jobUrl}?${pagination}`);
  }

  public getJobPostByRecruiterId(recruiterId: number, pagination: any): Observable<any> {
    return this.http.get<JobPostModel[]>(`${this.jobUrl}/recruiter/${recruiterId}?${pagination}`);
  }

  public getJobPostById(jobId: number): Observable<JobPostModel> {
    return this.http.get<JobPostModel>(`${this.jobUrl}/${jobId}`);
  }

  public getJobPostByName(jobName: string): Observable<JobPostModel> {
    return this.http.get<JobPostModel>(`${this.jobUrl}/name?jobName=${jobName}`);
  }

  public filterJobs(pagination: any): Observable<JobPostModel[]> {
    return this.http.get<JobPostModel[]>(`${this.jobUrl}/search?${pagination}`);
  }

  public filterJobsByRecruiterId(recruiterId: number, pagination: any): Observable<JobPostModel[]> {
    return this.http.get<JobPostModel[]>(`${this.jobUrl}/search/recruiter/${recruiterId}?${pagination}`);
  }

  public saveJobPost(jobPost: JobPostModel): Observable<any> {
    return this.http.post<any>(`${this.jobUrl}/save-job`, jobPost);
  }

  public editJobPost(jobPost: JobPostModel): Observable<any> {
    return this.http.put<any>(`${this.jobUrl}/edit-job`, jobPost);
  }

  public deleteJob(jobId: number): Observable<any> {
    return this.http.delete<any>(`${this.jobUrl}/delete-job/${jobId}`);
  }
}
