import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContatosComponent } from './components/contatos/contatos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'eventos', component: EventosComponent },
    { path: 'palestrantes', component: PalestrantesComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'contatos', component: ContatosComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

// Não esqueça de exportar o RouterModule
export const AppRouterModule = RouterModule.forRoot(routes);