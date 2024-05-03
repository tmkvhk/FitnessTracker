import { Component,OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data } from '../services/data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nutrition-history',
  templateUrl: './nutrition-history.component.html',
  styleUrl: './nutrition-history.component.css'
})

export class NutritionHistoryComponent implements OnInit, OnDestroy {
  dataHistory: Data[] = [];
  private dataSub: Subscription = new Subscription;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataHistory = this.dataService.getFoodData()
    this.dataSub = this.dataService.response$.subscribe((data: Data[]) => {
      this.dataHistory = data;
    });
  }

  onDelete(foodDataID: string){
    this.dataService.deleteFoodData(foodDataID);
  }

  ngOnDestroy(){
    this.dataSub.unsubscribe();
  }
}
