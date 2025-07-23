import { Component, inject, ViewChild } from '@angular/core';
import { Table } from '../../components/table/table';
import { AuthService, SweetAlertService, ToastrNotificationService, CompanyService } from '../../../../core/services';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { SearchBar } from '../../components/search-bar/search-bar';
import { CompanyModel } from '../../../../core/models';
import { MatIcon } from '@angular/material/icon';
import { OpenModalBtn } from '../../../../shared';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CompaniesForm } from '../../components/companies-form/companies-form';

@Component({
  selector: 'app-manage-companies',
  imports: [
    MatTooltip,
    MatIcon,
    RouterLink,
    Table,
    SearchBar,
    OpenModalBtn
  ],
  templateUrl: './manage-companies.html',
  styleUrl: './manage-companies.css'
})

export default class ManageCompanies {
  @ViewChild(Table) tableComp!: Table;
  protected dataSource = new MatTableDataSource<any>();
  protected modalBtn = { name: 'Add company', icon: 'fa-solid fa-plus', style: 'green' };
  protected columnNamesRef: string[] = ['id', 'name', 'description', 'imageName','actions'];
  protected columnNames: string[] = ['ID', 'Name', 'Description', 'Image name', 'Actions'];
  protected actions = [
    {
      id: 'edit',
      name: 'Edit',
      icon: 'edit-btn fa-solid fa-pencil'
    },
    {
      id: 'delete',
      name: 'Delete',
      icon: 'delete-btn fa-solid fa-trash'
    }
  ];
  private toastrService = inject(ToastrNotificationService); 
  private sweetAlertService = inject(SweetAlertService); 
  private authService = inject(AuthService);
  private companyService = inject(CompanyService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getCompanies();
  }

  public handleAction(event: {actionId: string, object: CompanyModel}): void {
    if(event.actionId === 'edit')
      this.handleModal(event.object);
    else if(event.actionId === 'delete')
      this.deleteCompany(event.object);
  }

  public handleSearch(event: { query: string}) {
    this.tableComp.applyFilter(event.query);
  }

  public handleModal(data: CompanyModel | null) {
    const dialogRef = this.dialog.open(CompaniesForm ,{
      data: data,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '250ms'
    });

    dialogRef.afterClosed().subscribe((company: any | undefined) => {
      if(company)
        this.handleFormSubmitted(company);
    });
  }

  public handleFormSubmitted(company: any) {
    this.dataSource.data = this.dataSource.data.filter(d => d.id !== company.id);
    this.dataSource.data = [...this.dataSource.data, company];
    this.dataSource.data = this.dataSource.data.sort((a, b) => a.id - b.id);
  }

  async deleteCompany(company: CompanyModel) {
    this.toastrService.clear();
    
    const result = await this.sweetAlertService.showConfirmationAndExecute(
      'You will delete a company',
      "You won't be able to revert this!",
      'Yes, deleted'
    );

    if(!result.isConfirmed) 
      return;
    
    this.companyService.deleteCompany(company.id).subscribe({
      next:(res) => {
        this.dataSource.data = this.dataSource.data.filter(d => d.id !== company.id);
        this.dataSource.data = [...this.dataSource.data];
        this.dataSource.data = this.dataSource.data.sort((a, b) => a.id - b.id);

        this.toastrService.showSuccess('Great!', res.message);
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else
          this.toastrService.showError('Error', 'An error occurred while fetching users');
      }
    });
  }

  private getCompanies(): void {
    this.companyService.getAllCompanies().subscribe({
      next:(companies) => {
        this.dataSource.data = companies;
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlertService.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'An error occurred while fetching companies');
      }
    });
  }
}
