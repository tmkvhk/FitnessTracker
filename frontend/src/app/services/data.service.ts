import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private responseSubject = new BehaviorSubject<any>(null);
  response$: Observable<any> = this.responseSubject.asObservable();

  constructor(private http: HttpClient) { }

  search(query: string) {
    const url = `http://localhost:3000/api/nutrition?query=${query}`;
    this.http.get(url).subscribe((data: any) => {
      this.responseSubject.next(data);
    }, error => {
      console.error('Error:', error);
    });
  }
}