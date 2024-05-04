import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nutrition-history',
  templateUrl: './nutrition-history.component.html',
  styleUrls: ['./nutrition-history.component.css']
})
export class NutritionHistoryComponent implements OnInit {
  searchHistory: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.searchHistory = this.dataService.getSearchHistory();
  }
}
