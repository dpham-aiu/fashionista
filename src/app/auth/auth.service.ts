import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uriseg = 'http://localhost:5000/api/users';
  private adminUrl = 'http://localhost:5000/api/admins';
  private decodedToken;
  private isAdmin = false;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    return this.http.post(URI, userData);
  }

  public login(userData: any): Observable<any> {
    const URI = this.uriseg + '/login';
    return this.http.post(URI, userData).pipe(
      map((token) => {
        return this.saveToken(token);
      })
    );
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    if (this.isAdmin == true) {
      localStorage.setItem('auth_admin', 'true');
    }
    return token;
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    if (localStorage.getItem('auth_admin') == 'true') {
      this.isAdmin = false;
      localStorage.removeItem('auth_admin');
    }
    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public isAdminAuth(): boolean {
    if (localStorage.getItem('auth_admin') == 'true') {
      return true;
    }
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }

  public getUserById(id: string): Observable<any> {
    const URI = this.uriseg + '/profile/';
    return this.http.get<any>(URI + id);
  }

  public adminLogin(adminData: any): Observable<any> {
    const URI = this.adminUrl + '/login';
    this.isAdmin = true;
    return this.http.post(URI, adminData).pipe(
      map((token) => {
        return this.saveToken(token);
      })
    );
  }
}
