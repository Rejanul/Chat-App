import { Component, OnInit } from '@angular/core';
import { UserService } from '../sharedService/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditTableComponent } from './edit-table/edit-table.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  total!: number;
  ItemPerPage: number = 5;
  pageNumber: number = 1;
  s!: string;
  haveData: boolean = true;
  constructor(
    private api: UserService,
    private dialog: MatDialog,
    private route: Router
  ) { }


  ngOnInit(): void {

    this.getUser(this.ItemPerPage, this.pageNumber);

  }
  openEdit(row: any) {
    this.dialog.open(EditTableComponent,
      {
        data: row
      }).afterClosed().subscribe(
        (res) => {
          console.log(res);
          if (res === 'updated') {
            this.getUser(this.ItemPerPage, this.pageNumber);
          }
        }
      )

  }
  deleteData(User: any) {

    if (confirm("Are you sure to delete " + User.name)) {
      this.api.deleteData(User.id).subscribe(
        (res) => {
          console.log(res);
          this.getUser(this.ItemPerPage, this.pageNumber)
        },
        (err) => {
          console.log(err);
        }
      )

    }
  }



  getUser(itemPerPage: number, pageNumber: number) {
    if (localStorage.getItem('accessToken') != null) {
      this.api.getFormData(itemPerPage, pageNumber).subscribe(
        (res) => {
          console.log(res);
          this.users = res;
          this.total = res.length;

        },
        (err) => {
          console.log(err);
          var tokenPair = {
            "AccessToken": localStorage.getItem('accessToken'),
            "RefreshToken": localStorage.getItem('refreshToken')

          }


          // this.refesh(tokenPair);

        }

      )
    }

  }
  refesh(tokenPair: any) {
    this.api.refresh(tokenPair).subscribe(
      (res) => {
        console.log(res);
        this.api.savetoken(res['accessToken'], res['refreshToken'])
        this.getUser(this.ItemPerPage, this.pageNumber);

      },
      (err) => {
        console.log(err);
        this.route.navigate(['/signIn']);

      }
    )
  }
  pageChangeEvent(page: number) {
    this.pageNumber = page;
    this.getUser(this.ItemPerPage, this.pageNumber);

  }





}





