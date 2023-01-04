import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../sharedService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'authentication';
  isLoggedIn: boolean = false;
  constructor(private route:Router , private api:UserService){}
  ngOnInit(): void {
    if (localStorage.getItem('accessToken') != null) {
      this.isLoggedIn = true;
    }

  }

  logout()
  {
    this.api.logout();
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.route.navigate(['/signIn']);
    

  }
  active(){
    this.route.navigate(['/live']);
    
  }


}
