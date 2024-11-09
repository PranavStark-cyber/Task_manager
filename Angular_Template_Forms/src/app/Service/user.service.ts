import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  userurl:string = 'http://localhost:5185/api/Users'
  getUser(){
    return this.http.get<User[]>(this.userurl);
  }

  getUserById(id:number){
    return this.http.get<User>(this.userurl + '/' + id);
  }

  addUser(addUser:User){
    return this.http.post(this.userurl,addUser);
  }

  updateUser(id:number, updateUser:User){
    return this.http.put(this.userurl+ '/' +id,updateUser);
  }

  deleteUser(id:number){
    return this.http.delete(this.userurl +'/'+ id);
  }
}


export interface User{
  id:number,
  name:string,
  email:string,
  gender:string,
  phone:string,
  address?:Address,
  tasks?:Task[],
  totalTasks:number
}

export interface Address{
  addressLine1:string,
  addressLine2:string,
  city:string,
  country:string,
  userId:number,
}