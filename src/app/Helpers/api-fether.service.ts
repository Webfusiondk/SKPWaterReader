import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { token } from '../models/token';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { betterUser } from '../models/betterUser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiFetcherService {
  tokenHolder : token;
  token: Observable<token>
  temp : any;
  user : betterUser;
  private tokenSubject: BehaviorSubject<token>;
  constructor(private http : HttpClient,private router : Router) { 
    this.tokenSubject = new BehaviorSubject<token>(JSON.parse(localStorage.getItem('token')));
    this.token = this.tokenSubject.asObservable();
  }


  public get GetToken(): token{
    return this.tokenSubject.value;
  }

  Register(user : User){
    return this.http.post('http://192.168.159.128:8080/api/user/createuser',user);
  }
  Login(username, password) {
    return this.http.post<token>('http://192.168.159.128:8080/api/user/login', { username, password })
      .pipe(map(data => {
        this.tokenHolder = <token>data;
        localStorage.setItem('token', JSON.stringify(this.tokenHolder));
        this.tokenSubject.next(data);
        return this.tokenHolder;
    }));

    }
    GetUserById(id: number){
      
      return this.http.get<betterUser>('http://192.168.159.128:8080/api/user/getuser' +id).toPromise();
    }

    GetAllUsers(){
      return this.http.get<User[]>(`http://192.168.159.128:8080/api/user/getallusers`);
    }

    RemoveUserById(id : number){
      return this.http.get<User[]>(`http://192.168.159.128:8080/api/user/remove` +id)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.GetToken.Id) {
            this.logout();
        }
        return x;
    }));
    }

    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('token');
      this.tokenSubject.next(null);
      this.router.navigate(['/account/login']);
  }

  UpdateUser(id, paramas){
    let tempuser : User;
    tempuser = paramas;
    tempuser.id = id;
    return this.http.post('http://192.168.159.128:8080/api/user/updateuser', tempuser)
  }

  UpdateSession(){
    return this.http.post('http://192.168.159.128:8080/api/user/validateuser', this.tokenSubject.value)
    .pipe(catchError((err)=> {
        return throwError(err);
      })
    )
  }

}
