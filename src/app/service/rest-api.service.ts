import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  url = 'http://localhost:3000/traveldetails'

  constructor(private http: HttpClient) { }

  getTravelDetails(): Observable<any> {
    return this.http.get(this.url);
  }
  
  updateTravelDetails(id: number, data: any): Observable<any> {
    return this.http.put(this.url + `/${id}`, data);
  }

  saveDetails(data: any): Observable<any> {
    return this.http.post(this.url, data)
  }

  deleteDetails(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`)
  }
  
}
