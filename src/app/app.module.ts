import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginRegistryComponent } from './login-registry/login-registry.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MesVoituresComponent } from './pages/mes-voitures/mes-voitures.component';
import { DepotsComponent } from './pages/depots/depots.component';
import { DepotFicheComponent } from './pages/depot-fiche/depot-fiche.component';
import { MesFacturesComponent } from './pages/mes-factures/mes-factures.component';
import { DepensesComponent } from './pages/depenses/depenses.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginRegistryComponent,
    InscriptionComponent,
    MesVoituresComponent,
    DepotsComponent,
    DepotFicheComponent,
    MesFacturesComponent,
    DepensesComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
