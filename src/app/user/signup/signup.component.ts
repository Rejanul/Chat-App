import { Component, OnInit } from '@angular/core';
import { User } from '../../sharedService/user.module';
import { UserService } from '../../sharedService/user.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { mustmatch } from '../../sharedService/passwordMatch';
import { is18 } from '../../sharedService/datevalidation';
//import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  wrongEmail?:string;
  wrongName?:string;
 //signUpForm:FormGroup;
  constructor(
    private api:UserService,
    private fb :FormBuilder
    
    ) { }


    signUpForm = this.fb.group({
      name:[
        '',[
          Validators.required
        ]
      ],
      email:[
        '',[
          Validators.email
        ]
      ],
      dateOfBirth:[
        '',
        [
          Validators.required
        ]
      ],
      password:[
        '',
        [
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          )
        ]
      ],
      confirmPassword:[
        '',
        [
          Validators.required
        ]
      ]
    },
    {
      validator:[
        is18('dateOfBirth'),
        mustmatch('password','confirmPassword')

      ]
    });
    
  ngOnInit(): void {
   
    
  }

  signUp()
  {

     this.api.signUpUser(this.signUpForm.value).subscribe(
       {
         next:(res)=>{
           console.log(res);
           

         },
         error:(err)=>{
           console.log(err.error);
           if(err.error.errors['Email']!==null)
                  this.wrongEmail= err.error.errors.Email[0];
            else{
              this.wrongEmail='';
            }
           if(err.error.errors['Name']!==null)
                 this.wrongName = err.error.errors.Name[0];
              else{
                this.wrongName = '';
              }
         }
       }
     )
  }

  get f()
  {
    return this.signUpForm.controls;
  }
}
