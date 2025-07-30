import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApplicantProfileImageService {
  private profileImagesUrl = `${API.baseUrl}/profile-images`;
  private http = inject(HttpClient);

  public getProfileImageByApplicantId(id: number): Observable<any> {
    return this.http.get<any>(`${this.profileImagesUrl}/byApplicantId/${id}`);
  }

  public saveProfileImage(form: FormData): Observable<any> {
    return this.http.post<any>(`${this.profileImagesUrl}/save-profile-image`, form);
  }
}
