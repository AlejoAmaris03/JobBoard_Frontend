import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Table } from "../../components/table/table";
import { UserService, AuthService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { UserModel } from '../../../../core/models';
import { SearchBar } from "../../components/search-bar/search-bar";
import { OpenModalBtn } from "../../../../shared/";
import { MatDialog } from '@angular/material/dialog';
import { UsersForm } from '../../components/users-form/users-form';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-show-users',
  imports: [
    MatIcon,
    MatTooltip,
    RouterLink,
    Table,
    SearchBar,
    OpenModalBtn
],
  templateUrl: './show-users.html',
  styleUrl: './show-users.css'
})

export default class ShowUsers implements OnInit {
  @ViewChild(Table) tableComp!: Table;
  protected users: UserModel[] = [];
  protected dataSource = new MatTableDataSource<any>();
  protected modalBtn = { name: 'Add user', icon: 'fa-solid fa-user-plus', style: 'green' };
  protected columnNamesRef: string[] = ['id', 'name', 'surname', 'email', 'role', 'actions'];
  protected columnNames: string[] = ['ID', 'Name', 'Surname', 'Email', 'Role', 'Actions', 'Actions'];
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
  private userService = inject(UserService);
  private userLoggedInId = this.authService.getUserLoggedIn().id;
  private dialog = inject(MatDialog)

  ngOnInit(): void {
    this.getUsers();
  }

  public handleAction(event: {actionId: string, object: UserModel}): void {
    if(event.actionId === 'edit')
      this.handleModal(event.object);
    else if(event.actionId === 'delete')
      this.deleteUser(event.object);
  }

  public handleSearch(event: { query: string}) {
    this.tableComp.applyFilter(event.query);
  }

  public handleModal(data: UserModel | null) {
    const dialogRef = this.dialog.open(UsersForm, {
      data: data,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '250ms'
    });

    dialogRef.afterClosed().subscribe((user: any | undefined) => {
      if(user)
        this.handleFormSubmitted(user);
    });
  }

  public handleFormSubmitted(newUser: any) {
    this.dataSource.data = this.dataSource.data.filter(d => d.id !== newUser.id);
    this.dataSource.data = [...this.dataSource.data, newUser];
    this.dataSource.data = this.dataSource.data.sort((a, b) => a.id - b.id);
  }

  async deleteUser(user: UserModel) {
    this.toastrService.clear();
    
    const result = await this.sweetAlertService.showConfirmationAndExecute(
      'You will delete a user',
      "You won't be able to revert this!",
      'Yes, deleted'
    );

    if(!result.isConfirmed) 
      return;
    
    this.userService.deleteUser(user.id).subscribe({
      next:(res) => {
        this.dataSource.data = this.dataSource.data.filter(d => d.id !== user.id);
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

  private getUsers(): void {
    this.userService.getAllUsers(this.userLoggedInId).subscribe({
      next:(users) => {
        this.dataSource.data = users;
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
}
