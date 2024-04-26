import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['nutrition.component.css']
})
export class NutritionComponent {
  query: string = '';
  response: any;

  constructor(private http: HttpClient) { }

  search() {
    const url = `http://localhost:3000/api/nutrition?query=${this.query}`;
    this.http.get(url).subscribe((data: any) => {
      this.response = data;
    }, error => {
      console.error('Error:', error);
    });
  }
}
