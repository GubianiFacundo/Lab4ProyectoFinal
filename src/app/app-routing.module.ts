import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from './services/logged.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MozoComponent } from './components/mozo/mozo.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard] },
  { path: 'registerMozo', component: MozoComponent, canActivate: [LoggedGuard] },
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
