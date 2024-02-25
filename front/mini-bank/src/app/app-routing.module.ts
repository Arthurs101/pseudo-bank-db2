import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'historial-transacciones', component: HistorialTransaccionesComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
