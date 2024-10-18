import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListRestService {

  private apiUrl = 'https://restcountries.com/v3.1/all';
  public mockApi = 'assets/list-mock.json';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  getMockProcts(): Observable<any> {
    return this.http.get(this.mockApi);
  }


}
