import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: 'implicit/callback', component: OktaCallbackComponent },
  {path: '', component: LoginComponent },
  {path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
