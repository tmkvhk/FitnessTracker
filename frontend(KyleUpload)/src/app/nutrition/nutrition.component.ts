import { Component,OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['nutrition.component.css']
})
export class NutritionComponent implements OnInit, OnDestroy{
  query: string = '';
  response: any;
  item: any;
  private dataSub: Subscription = new Subscription;


  constructor(public dataService: DataService) { }

  onAddFood() {
    this.dataService.addFood(this.query);
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.response$.subscribe(data => {
      this.response = data;
      if (this.response) {
        this.item = this.response[this.response.length - 1][0];
      }
    });
  }

  ngOnDestroy(): void {
      this.dataSub.unsubscribe();
  }
}
