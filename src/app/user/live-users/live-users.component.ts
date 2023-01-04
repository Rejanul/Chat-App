import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/sharedService/user.service';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EditTableComponent } from 'src/app/home/edit-table/edit-table.component';
import { Router } from '@angular/router';
//import * as internal from 'stream';

@Component({
  selector: 'app-live-users',
  templateUrl: './live-users.component.html',
  styleUrls: ['./live-users.component.css']
})
export class LiveUsersComponent implements OnInit {
  user_name!:string;
  users:any;
  total!:number;
  ItemPerPage:number =5;
  pageNumber:number = 1;
  s!: string;
  haveData:boolean = true;
  id:any;
  constructor(
    private api : UserService,
    private dialog :MatDialog,
    private route:Router
  ) { }
  
  
  ngOnInit(): void {
    
   this.getActiveUsers();
  this.id = setInterval(
    ()=>{
        this.getActiveUsers();
    },5000
  );
    
  }
  openEdit(row:any)
  {
      this.dialog.open(EditTableComponent,
        {
          data:row
        }).afterClosed().subscribe(
          (res)=>{
            console.log(res);
            if(res==='updated')
            {
              this.getUser(this.ItemPerPage,this.pageNumber);
            }
          }
        )
     
  }
  deleteData(User:any)
    {
      
        if(confirm("Are you sure to delete "+User.name)) {
          this.api.deleteData(User.id).subscribe(
            (res)=>{
              console.log(res);
              this.getUser(this.ItemPerPage,this.pageNumber)
            },
            (err)=>{
              console.log(err);
            }
          )
          
        }
    }
  
  getActiveUsers(){
    this.api.getLiveUsers().subscribe(
      (res)=>{
          
          this.users = res;console.log(res);
          this.total = res.length;
      },
      (err)=>{
        console.log(err);
      }
    )
      
  }
  

  getUser(itemPerPage:number , pageNumber:number)
  {
    this.api.getFormData(itemPerPage,pageNumber).subscribe(
      (res)=>{
        console.log(res);
        this.users = res;
        this.total = res.length;

      },
      (err)=>{
        console.log(err);
        var tokenPair = {
          "AccessToken": localStorage.getItem('accessToken'),
          "RefreshToken": localStorage.getItem('refreshToken')

        }
        
      // this.refesh(tokenPair);
        
      }
    )
     
    
  }
  refesh(tokenPair:any){
    this.api.refresh(tokenPair).subscribe(
      (res)=>{
        console.log(res);
        this.api.savetoken(res['accessToken'] , res['refreshToken'])
       this.getUser(this.ItemPerPage,this.pageNumber);
        
      },
      (err)=>{
        console.log(err);
        this.route.navigate(['/signIn']);

      }
    )
  }
  pageChangeEvent(page:number){
    this.pageNumber = page;
    this.getUser(this.ItemPerPage,this.pageNumber);
    
  }


  //chatting section
  chat(name:string){
   this.user_name = name;


  }
  

}
