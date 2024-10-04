import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsers } from '../../interface/interface.';
import { UsersService } from 'src/app/services/users/users.service';
export interface DialogData {
  userId: number;
  name: string;
  hierarchy: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editUser: FormGroup;
  id: string;

  c: any[] = [{ hierarchy: 'admin' }, { hierarchy: 'cliente' }];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UsersService
  ) {
    this.editUser = fb.group({
      name: ['', Validators.required],
      hierarchy: ['', Validators.required],
    });
    this.id = String(data.userId);
  }

  ngOnInit(): void {
    if (this.id) {
      this.userService.getUser().subscribe((user: IUsers[]) => {
        const u = user.find((el) => el.id === this.id);
        if (u) {
          this.fillForm(u);
        }
      });
    }
  }
  fillForm(user: IUsers) {
    this.editUser.patchValue({
      name: user.name,
      hierarchy: user.hierarchy,
    });
  }
  editRegister() {
    if (this.editUser.valid) {
      const user = this.editUser.value;
      this.userService.editUser(this.id, user).subscribe();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
