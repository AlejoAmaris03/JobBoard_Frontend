import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { UserService, AuthService, RoleService, SweetAlertService, ToastrNotificationService } from '../../../../core/services';
import { RoleModel, UserModel } from '../../../../core/models';

@Component({
  selector: 'app-users-form',
  imports: [
    MatDialogModule,
    MatIcon,
    MatTooltip,
    ReactiveFormsModule
  ],
  templateUrl: './users-form.html',
  styleUrl: './users-form.css'
})

export class UsersForm {
  protected form!: FormGroup;
  protected formSubmitted: boolean = false;
  protected roles: RoleModel[] = [];
  private roleService = inject(RoleService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrNotificationService);
  private sweetAlert = inject(SweetAlertService);
  private emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UsersForm>);
  private data = inject<UserModel>(MAT_DIALOG_DATA);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['', this.data ? [] : Validators.required],
      role: ['', Validators.required]
    });

    this.getRoles();

    if(this.data)
      this.fillFormWithData();
  }

  protected submitForm(): void {
    this.toastrService.clear();
    this.formSubmitted = true;

    if(this.form.valid) {
      const action = this.form.controls['id'].value === '' ? 'add' : 'edit';

      if(action === 'add')
        this.addUser();
      else if(action === 'edit')
        this.editUser();

      this.formSubmitted = false;      
    }
  }

  private addUser(): void {
    this.userService.registerUser(this.form.value).subscribe({
      next: (res) => {
        this.dialogRef.close(res.user);
        this.toastrService.showSuccess('Great!', res.message);
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlert.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'Something went wrong during registration');
      }
    });
  }

  private editUser(): void {
    const formtoSend = {...this.form.value};

    if(formtoSend.password === '')
      delete formtoSend.password;

    this.userService.editUser(formtoSend).subscribe({
      next: (res) => {
        this.dialogRef.close(res.user);
        this.toastrService.showSuccess('Great!', res.message);
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlert.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'Something went wrong during editation');
      }
    });
  }

  private fillFormWithData() {
    this.form.patchValue({
      id: this.data.id,
      name: this.data.name,
      surname: this.data.surname,
      email: this.data.email
    });
  }

  private getRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res;
        this.cdr.detectChanges();

        if(this.data) {
          this.form.patchValue({
            role: this.roles.find(role => role.name.split('_')[1] === this.data.role)
          });
        }
      },
      error: (err) => {
        if(err.status === 400 && err.error.error)
          this.toastrService.showError('Error', err.error.error);
        else if(!this.authService.isAuthenticated())
          this.sweetAlert.sessionExpired('Session Expired', 'Please login again to continue');
        else 
          this.toastrService.showError('Error', 'Something went wrong while fetching roles');
      }
    });
  }
}
