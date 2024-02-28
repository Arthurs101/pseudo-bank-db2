import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';
import { RealizarTransaccionComponent } from './realizar-transaccion/realizar-transaccion.component';
import { NotFoundComponentComponent } from './NotFoundComponent/NotFoundComponent.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'historial-transacciones', component: HistorialTransaccionesComponent },
  { path: 'realizar-transaccion', component: RealizarTransaccionComponent },
  {path :'not-found', component: NotFoundComponentComponent },
  { path: 'configuracion-usuario', component: UserSettingsComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
