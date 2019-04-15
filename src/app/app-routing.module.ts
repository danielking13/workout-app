import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {DietComponent} from './diet/diet.component';
import {ExerciseComponent} from './exercise/exercise.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: '', component: LoginComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'diet', component: DietComponent },
  {path: 'exercise', component: ExerciseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
