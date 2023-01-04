import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { SignupComponent } from "./user/signup/signup.component";
import { UserComponent } from "./user/user.component";
import { LiveUsersComponent } from "./user/live-users/live-users.component";
import { NavbarComponent } from "./navbar/navbar.component";

export const userAppRouting :Routes = [
    {path:'home', component : HomeComponent , canActivate:[AuthGuard]},
    {path:'signIn' , component:UserComponent,
    children:[{path:'', component:SignInComponent}]
    },
    {
        path:'signUp',component:UserComponent,
        children:[{path:'',component:SignupComponent}]
    },
  
   {
    path:'live' , component:LiveUsersComponent
   },
   {
    path:'navbar', component:NavbarComponent
   },
   
   
    {path:'',redirectTo:'/signIn' , pathMatch:'full'}
];