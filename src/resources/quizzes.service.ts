import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http: HttpClient) {
   }

  getTests(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>('http://localhost:5000/tests');
  }

}
