import { inject, Injectable } from '@angular/core';
import { API } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyModel } from '../../models';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private companiesUrl = `${API.baseUrl}/companies`;
  private http = inject(HttpClient);

  public getAllCompanies(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.companiesUrl);
  }

  public getImageById(companyId: number): any {
    return `${this.companiesUrl}/image/${companyId}`;
  }

  public getCompanyByName(companyName: string): Observable<any> {
    return this.http.get<any>(`${this.companiesUrl}/name?companyName=${companyName}`);
  }

  public registerCompany(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.companiesUrl}/register-company`, formData);
  }

  public editCompany(formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.companiesUrl}/edit-company`, formData);
  }

  public deleteCompany(idCompany: number) {
    return this.http.delete<any>(`${this.companiesUrl}/delete-company/${idCompany}`);
  }
}
