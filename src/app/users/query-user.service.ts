import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { Observable } from 'rxjs';

export interface Geo {
    lat: number;
    lng: number;
}

export interface User {
  name: string;
  email: string;
  address: string;
  geo: Geo;
}

@Injectable({
  providedIn: 'root'
})
export class QueryUserService {

  constructor(private httpClient: HttpClient) { 
  }

  getUsers(): Observable<any> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  getUser(id: number): Observable<any> {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  post(user: User): Observable<any> {
    return this.httpClient.post(`https://jsonplaceholder.typicode.com/users/`, user);
  }

  put(id: number, user: User): Observable<any> {
    return this.httpClient.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
  
}
