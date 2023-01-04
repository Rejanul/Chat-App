import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { is18 } from 'src/app/sharedService/datevalidation';
import { UserService } from 'src/app/sharedService/user.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  name?:string ;
  isEdited:boolean=false ;
  error?:string;
  
  result?:any;
  datalist=[];
  constructor(
    private ngzone:NgZone,
    private api: UserService,
    private fb : FormBuilder,
    public dref : MatDialogRef<EditTableComponent>,
    @Inject(MAT_DIALOG_DATA) public EditData:any

  ) { }

    editTableForm = this.fb.group(
      {
        id:[
    
        ],
    //     name:['',
    //   [Validators.required]
    // ],
        email:['',
      [Validators.email]
      ],
        dateOfBirth:['',
      Validators.required
      ]
      },
      {
        validator:[
          is18('dateOfBirth')
        ]
      }
    )

  ngOnInit(): void {

    if(this.EditData)
    {
      this.editTableForm.controls['id'].setValue(this.EditData.id);
     // this.editTableForm.controls['name'].setValue(this.EditData.name);
      this.editTableForm.controls['email'].setValue(this.EditData.email);
      this.editTableForm.controls['dateOfBirth'].setValue(this.EditData.dateOfBirth);
      this.name=this.EditData.name

    }

    
  }
 Edit(){
    this.api.editData(this.editTableForm.value).subscribe(
      (res)=>{
        
       console.log(res.message);
        // this.result=res;
        this.isEdited=!this.isEdited;
       
      },
      (err)=>{
        
        console.log(err);
        this.error = err.error.errors.Email[0]; 
       

      }
    )
    
       
 }
 cancel(s:string){
   this.dref.close(s);
 }
 
}


