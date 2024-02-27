import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';
import { RealizarTransaccionComponent } from './realizar-transaccion/realizar-transaccion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotFoundComponentComponent } from './NotFoundComponent/NotFoundComponent.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [		
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HistorialTransaccionesComponent,
    RealizarTransaccionComponent,
      NotFoundComponentComponent,
      AccountsComponent,
      UserSettingsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
