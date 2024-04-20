import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl='http://localhost:8081'
  constructor(private http:HttpClient, private router: Router) { }

  register(name: string, email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response=>{
        localStorage.setItem("token",response.body.access_token);
        localStorage.setItem("username",response.body.name)
      })
    );
  }

  logout(): void{
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }
  isAuthenticated(): boolean {
    // Check if token exists in local storage or if the user is logged in by other means
    return !!localStorage.getItem('token');
  }
}
