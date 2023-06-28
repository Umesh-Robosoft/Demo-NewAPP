import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsapiServiceService {

  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllNews(endpoint: string): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.httpClient.get(url);
   }

   searchNews(param:string,endpoint: string):Observable<any> {        
    const url = `${this.baseUrl}/${endpoint}=${param}`;
    return this.httpClient.get(url); 
}
}
