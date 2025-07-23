import { inject, Injectable } from '@angular/core';
import { API } from "../../../../environment/";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthModel, UserAuth, UserModel } from '../../models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authApi = `${API.baseUrl}/auth`;
  private http = inject(HttpClient);

  public login(user: UserModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.authApi}/login`, user).pipe(
      tap((user) => {
        if(user)
          this.setToken(user.token);
      })
    );
  }

  public register(user: UserModel): Observable<any> {
    return this.http.post<any>(`${this.authApi}/register`, user);
  }

  public getToken(): string | null {
    if(typeof window !== 'undefined')
      return localStorage.getItem('token');

    return null;
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getUserLoggedIn(): UserAuth {
    const token = this.getToken();

    const id = JSON.parse(atob(token!.split('.')[1])).id;
    const name = JSON.parse(atob(token!.split('.')[1])).name;
    const surname = JSON.parse(atob(token!.split('.')[1])).surname;
    const email = JSON.parse(atob(token!.split('.')[1])).sub;
    const role = JSON.parse(atob(token!.split('.')[1])).role;

    return { id, name, surname, email, role };
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    if(!token)
      return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = payload.exp * 1000;

    return Date.now() < expirationDate;
  }

  public logout(): void {
    if(typeof window !== 'undefined')
      localStorage.removeItem('token');
  }
}
