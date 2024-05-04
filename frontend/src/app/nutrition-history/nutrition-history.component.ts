import { Component,OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nutrition-history',
  templateUrl: './nutrition-history.component.html',
  styleUrl: './nutrition-history.component.css'
})
export class NutritionHistoryComponent implements OnInit 
{response: any;

constructor(private dataService: DataService) { }

ngOnInit(): void {
  this.dataService.response$.subscribe(data => {
    this.response = data;
  });
}
}