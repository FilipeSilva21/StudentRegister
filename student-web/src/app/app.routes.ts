import { Routes } from '@angular/router';
import { HomeComponent } from './student/home/home.component';

export const routes: Routes = [
  {path: "student/home", component:HomeComponent},
  {path: "student", redirectTo:"student/home", pathMatch:"full"},
  {path: "", redirectTo:"student/home", pathMatch:"full"}
];

