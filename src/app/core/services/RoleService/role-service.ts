import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { RoleModel } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  private roleUrl = `${API.baseUrl}/roles`;
  private http = inject(HttpClient);

  public getAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.roleUrl);
  }
}
