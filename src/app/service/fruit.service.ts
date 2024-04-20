import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fruit } from '../fruit';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  url = 'http://localhost:8081/';
  constructor(private http: HttpClient, private authservice: AuthService) {}



  getAllTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}todos`, {
      headers: this.authservice.createAuthorizationHeader()

    });
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.url}todos/${taskId}`, {
      headers: this.authservice.createAuthorizationHeader(),
    });
  }
  addTodo(todo: Fruit): Observable<any> {
    return this.http.post(`${this.url}todos`, todo, {
      headers: this.authservice.createAuthorizationHeader()
    });
  }

  updateTodo(todo: Fruit): Observable<any> {
    return this.http.put(`${this.url}todos`, todo, {
      headers: this.authservice.createAuthorizationHeader()
    });
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.url}todo/${id}`, {
      headers: this.authservice.createAuthorizationHeader()
    });

    
  }
}
