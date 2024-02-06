import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as yaml from 'js-yaml';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getCV(): Observable<any> {
    return this.http.get('assets/cv.yaml', { responseType: 'text' })
      .pipe(
        map(data => yaml.load(data)),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
