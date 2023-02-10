import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  trivia_url: string = 'https://the-trivia-api.com/api/questions'

  constructor(private http: HttpClient) {
   }

  getTests(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>('assets/tests.json');
  }

  getQuestions(): Observable<any>{
    return this.http.get('assets/quiz.json')
  }

  getQuizzes(category: string, limit: number): Observable<any>{
    return this.http.get(`${this.trivia_url}?categories=${category}&limit=${limit}&difficulty=easy`)
  }

}

