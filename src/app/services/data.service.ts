import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpc: HttpClient
  ) { }

  postFilter(genre1: string, genre2: string, year: number): Observable<string> {
    return this.httpc.post('http://localhost:3000/postYearGenreOneOptional', 
    {
      year, genre1, genre2
    },
    { responseType: 'text' })
  }
}
