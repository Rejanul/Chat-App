import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
    if(localStorage.getItem('accessToken')!=null){
      return true;
    }
    else{
      this.route.navigate(['/signIn']);
      return false
    }
  }
  
}
function constractor() {
  throw new Error('Function not implemented.');
}

