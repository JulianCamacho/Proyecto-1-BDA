import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  // API route
  private api_url: string = 'http://localhost:4000/api/';

  // User login request
  async postUserLogin(username: string, password: string){
    let json_body = {
      "username": username,
      "password": password
    }
    return await lastValueFrom(this.http.post<string>(this.api_url + 'auth/user',
     json_body))
     .catch((e) => {
      return e['error'];
  });
  }

  // POST User registry
  async postUserRegistry(name: string, username: string, password: string, section: string){
    let json_body = {
      "name": name,
      "username": username,
      "password": password,
      "section": section
    }
    return await lastValueFrom(this.http.post<string>(this.api_url + 'auth/newUser',
     json_body))
     .catch((e) => {
      return e['error'];
  });
  }

  // POST New club creation
  async postNewClub(json_body: any){
    return await lastValueFrom(this.http.post<string>(this.api_url + 'clubes/new',
     json_body))
     .catch((e) => {
      return e['error'];
  });    
  }

  // POST Interest on certain club
  async postInterestedOnClub(clubName: string, userName: string){
    let json_body = {
      "clubName": clubName,
      "userName": userName
    }
    return await lastValueFrom(
      this.http.post<string>(this.api_url + 'clubes/interest',
     json_body))
     .catch((e) => {
      return e['error'];
  });
  }

  // GET suggested clubes by user
  async getSuggestedClubes(userId: string){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'clubes/suggested/' + userId));
  }

  // GET interest clubes by user
  async getInterestClubes(user: string){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'clubes/interested/' + user));
  }

  // GET not interest clubes by user
  async getNotInterestClubes(user: string){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'clubes/notInterested/' + user));
  }

  // GET clubes by category
  async getClubesByCategory(){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'clubes/byCategory/'));
  }
}
