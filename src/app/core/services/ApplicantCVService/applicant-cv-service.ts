import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApplicantCvService {
  private cvUrl = `${API.baseUrl}/cvs`;
  private http = inject(HttpClient);

  public getCvByApplicantId(id: number): Observable<any> {
    return this.http.get<any>(`${this.cvUrl}/byApplicantId/${id}`);
  }

  public saveCV(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.cvUrl}/save-cv`, formData);
  }

  public deleteCV(cvId: number): Observable<any> {
    return this.http.delete<any>(`${this.cvUrl}/delete-cv/${cvId}`);
  }
}
