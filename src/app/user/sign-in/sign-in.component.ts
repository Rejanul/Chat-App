import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/sharedService/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error='';
  constructor( private fb:FormBuilder ,private api:UserService ,private route:Router) { }
  logInForm = this.fb.group({
    name:[
      '',
      [
        Validators.required
      ]
    ],
    password:[
      '',
      [
        Validators.required
      ]
    ]
  })
  

  ngOnInit(): void {
  }

  logIn() 
  {
      this.api.logIn(this.logInForm.value).subscribe(
       
          (res)=>{
              console.log('result:'+res['accessToken']+ '\nrefreh: '+res['refreshToken']);
              this.api.savetoken(res['accessToken' ] , res['refreshToken'])
              //localStorage.setItem('userToken', res['accessToken'] );
              //localStorage.setItem('refreshToken', res['refreshToken'] );
            // console.log(localStorage.getItem('userToken'))
              this.route.navigate(['/home']);

          },
          (err)=>{
            console.log(err.message);
              this.error="User name and password don't match";
          }
       
      )
  }
}
