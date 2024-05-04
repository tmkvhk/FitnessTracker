// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionComponent } from './nutrition/nutrition.component';
import { NutritionHistoryComponent } from './nutrition-history/nutrition-history.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'nutritionOutput', component: NutritionHistoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
