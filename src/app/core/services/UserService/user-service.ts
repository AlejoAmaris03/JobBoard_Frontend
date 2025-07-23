import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyModel, UserModel } from '../../models';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private adminUrl = `${API.baseUrl}/users`;
  private http = inject(HttpClient);

  public getAllUsers(userLoggedInId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.adminUrl}/${userLoggedInId}`);
  }

  public registerUser(user: UserModel): Observable<any> {
    return this.http.post<any>(`${this.adminUrl}/register-user`, user);
  }

  public sendEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.adminUrl}/forgot-password`, email);
  }

  public editUser(user: UserModel): Observable<any> {
    return this.http.put<any>(`${this.adminUrl}/edit-user`, user);
  }

  public updateProfile(user: UserModel, token: string | null): Observable<any> {
    return this.http.put<any>(`${this.adminUrl}/update-profile?token=${token}`, user);
  }

  public deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.adminUrl}/delete-user/${userId}`);
  }
}
