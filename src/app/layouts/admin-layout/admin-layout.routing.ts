import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
// Manomboka eto ny vrai
import { MesVoituresComponent } from '../../pages/mes-voitures/mes-voitures.component';
import { AjoutDepotComponent } from '../../pages/ajout-depot/ajout-depot.component';
import { DepotsComponent } from '../../pages/depots/depots.component';
import { DepotFicheComponent } from '../../pages/depot-fiche/depot-fiche.component';
import { StatistiquesComponent } from '../../pages/statistiques/statistiques.component';
import { DepensesComponent } from '../../pages/depenses/depenses.component';
import { MesFacturesComponent } from '../../pages/mes-factures/mes-factures.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    // Manomboka eto ny vrai
    { path: 'reparer-voiture',     component: AjoutDepotComponent },
    { path: 'mes-voitures',        component: MesVoituresComponent },
    { path: 'depots',              component: DepotsComponent },
    { path: 'depot/:id',           component: DepotFicheComponent },
    { path: 'statistiques',        component: StatistiquesComponent },
    { path: 'depenses',            component: DepensesComponent },
    { path: 'mes-factures',            component: MesFacturesComponent },
];
