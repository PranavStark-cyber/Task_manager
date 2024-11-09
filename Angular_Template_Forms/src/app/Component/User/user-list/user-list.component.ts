import { Component, TemplateRef } from '@angular/core';
import { User, UserService } from '../../../Service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { SearchUsersPipe } from '../../../Pipes/search-users.pipe';
import { HomeComponent } from '../../home/home.component';
import { Task, TaskService } from '../../../Service/task.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchUsersPipe,HomeComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  Users:User[] = [];
  SearchText:string = "";
  modalRef?: BsModalRef;
  userId:number = 0

  constructor(private userservice:UserService , private router:Router ,private toastr: ToastrService, private modalService: BsModalService){
    this.listUsers();
  }

  ngOnInit(): void {
    
  }

  GoToAddUser(){
    this.router.navigate(['/home/user-add']);
  }
  
  GoToEdit(id:number){
    this.router.navigate(['/home/user-edit',id]);
  }

  listUsers(){
    this.userservice.getUser().subscribe({
      next: (data:User[]) => {
        this.Users = data;
      },
      complete:()=>{
        this.Users.forEach(u => {
          let count = 0;
          u.tasks?.forEach(t => {
            count++;
          })
          u.totalTasks = count;
         })
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  openModalWithClass(template: TemplateRef<void> , userId:number) {
    this.userId = userId
    let USER:User;
    this.userservice.getUserById(userId).subscribe({
      next: (data:User) => {
        USER = data
      },
      complete:()=>{
        if(USER.tasks?.length != 0){
          this.toastr.warning("you can't delete this User." , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:2000
          })
        }else{
          this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
        }
      },
      error:(err:any)=>{
        console.log(err);
      }
    })

    
  }
 
  confirm(): void {
    this.userservice.deleteUser(this.userId).subscribe((data) => {
      this.toastr.success("User Deleted Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:2000
      })
      this.listUsers();
    }),
    

    this.modalRef?.hide();  
  }
 
  decline(): void {
    this.modalRef?.hide();
  }


}
