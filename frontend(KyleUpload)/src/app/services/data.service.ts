import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Data } from './data.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataHistory: Data[] = [];
  private responseSubject = new BehaviorSubject<any>(null);
  response$: Observable<any> = this.responseSubject.asObservable();

  constructor(private http: HttpClient) { }

  addFood(query: string){ //search(query: string) {
    const url = `http://localhost:3000/api/nutrition?query=${query}`;
    this.http.get<{message: String, data: Data}>(url).subscribe((foodData) => {
      this.dataHistory.push(foodData.data);
      this.responseSubject.next([...this.dataHistory]);
    });
  }

  getFoodData(){
    const url = 'http://localhost:3000/api/nutrition/data';
    this.http.get<{message: String, data: Data[]}>(url).pipe(map((foodData) =>{
      return foodData.data.map((food: any) =>{
        return {
          id: food._id,
          name: food.name,
          calories: food.calories,
          serving_size_g: food.serving_size_g,
          fat_total_g: food.fat_total_g,
          fat_saturated_g: food.fat_saturated_g,
          protein_g: food.protein_g,
          sodium_mg: food.sodium_mg,
          potassium_mg: food.potassium_mg,
          cholesterol_mg: food.cholesterol_mg,
          carbohydrates_total_g: food.carbohydrates_total_g,
          fiber_g: food.fiber_g,
          sugar_g: food.sugar_g,
          enteredQuery: food.enteredQuery
        }
      })
    }))
    .subscribe((transformedData) => {
      this.dataHistory = transformedData
      this.responseSubject.next([...this.dataHistory]);
    });
    return [...this.dataHistory]
  }

  deleteFoodData(foodDataID: string) {
    const url = 'http://localhost:3000/api/nutrition/'+foodDataID;
    this.http.delete(url).subscribe(()=>{
      const updatedHistory = this.dataHistory.filter(food => food.id !== foodDataID)
      this.dataHistory = updatedHistory
      this.responseSubject.next([...this.dataHistory]);
    })
  }
}
