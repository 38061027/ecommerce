import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/core/forms/form/form.component';
import { IUsers } from 'src/app/core/interface/interface.';
import { UsersService } from 'src/app/services/users/users.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EditUserComponent } from 'src/app/core/forms/edit-user/edit-user.component';

@Component({
  selector: 'app-menager',
  templateUrl: './menager.component.html',
  styleUrls: ['./menager.component.css'],
})
export class MenagerComponent implements OnInit {
  isCollapsed = true;
  users: IUsers[] = [];
  userLocal = localStorage.getItem('user')
  userIdLocal!: number
  hasError:boolean = false;
  
  constructor(private router: Router, private userService: UsersService,  public dialog: MatDialog) {
    if(this.userLocal){
      let user = JSON.parse(this.userLocal)
      this.userIdLocal = user.id
     }
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((res) => (this.users = res));
  }

  goToForm() {
    this.router.navigate(['form']);
  }
  deleteUser(id: number) {
  if(this.userIdLocal !== id){
    this.userService.deleteUser(id).subscribe(() => this.getUser());
  }else{
    this.hasError = true
    setTimeout(()=>{
      this.hasError = false
    },4000)
  }
  }


  openDialog(id:number): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data:{userId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
   
    });
  }

}
