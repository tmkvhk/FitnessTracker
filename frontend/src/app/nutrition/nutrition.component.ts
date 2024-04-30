import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['nutrition.component.css']
})
export class NutritionComponent {
  query: string = '';
  response: any;


  constructor(private dataService: DataService) { }

  search() {
    this.dataService.search(this.query);
  }

  ngOnInit(): void {
    this.dataService.response$.subscribe(data => {
      this.response = data;
    });
  }
}
