import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url: string = 'http://dragonriders.learnathon.net/api3/api/signup/';
  user_url:string = 'https://dragonriders.herokuapp.com/api/User/';
  auth_url:string = 'https://dragonriders.herokuapp.com/api/Auth/';
  
  

  constructor(private http:HttpClient) { }
   headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('accessToken')});
   //save token
    savetoken(accessToken:string , refreshToken:string){
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken',refreshToken)
    }

  
   //user call
  signUpUser(data:any)
  {
    return this.http.post<any>(this.user_url+'Register',data);
  }
  logIn(data:any)
  {
    var headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<any>(this.auth_url+'login',data);
  }

  // authentication
  getFormData(itemPerPage:number , pageNumber:number)
  {
    
    return  this.http.get<any>(this.user_url+'list/'+pageNumber+'/'+itemPerPage,{headers:this.headers});
  }

  refresh(tokenPairs:any){
    return this.http.post<any>(this.auth_url+'refresh' ,tokenPairs);
  }
  deleteData(id:number){
    return this.http.delete<any>(this.user_url+'Delete'+id ,{headers:this.headers});
  }
  editData(data:any):Observable<any> {
    return this.http.put<any>(this.user_url+'update',data ,{headers:this.headers});
  }

  logout(){
    var tokenPair = {
      "AccessToken": localStorage.getItem('accessToken'),
      "RefreshToken": localStorage.getItem('refreshToken')

    }
    return this.http.post,<any>(this.auth_url+"logout",tokenPair);
  }
  //for live users

  getLiveUsers(){
    return this.http.get<any>(this.user_url+"GetAllActiveUsers" , {headers:this.headers});
  }
}
