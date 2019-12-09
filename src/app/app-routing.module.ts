import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from './services/logged.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MozoComponent } from './components/mozo/mozo.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PlatoComponent } from './components/plato/plato.component';
import { AdicionesComponent } from './components/adiciones/adiciones.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard] },
  { path: 'registerMozo', component: MozoComponent, canActivate: [LoggedGuard] },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [LoggedGuard] },
  { path: 'platos', component: PlatoComponent, canActivate: [LoggedGuard] },
  { path: 'adiciones', component: AdicionesComponent, canActivate: [LoggedGuard] },
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
