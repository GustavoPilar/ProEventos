import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { CadastroComponent } from './components/user/cadastro/cadastro.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'user', component: UserComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'cadastro', component: CadastroComponent}
        ]
    },
    { path: 'user/perfil', component: PerfilComponent },
    { path: 'eventos', redirectTo: 'eventos/lista'},
    { 
        path: 'eventos', component: EventosComponent,
        children: [
            { path: 'detalhe/:id', component: EventoDetalheComponent },
            { path: 'detalhe', component: EventoDetalheComponent },
            { path: 'lista', component: EventoListaComponent},
        ], 
    },
    { path: 'palestrantes', component: PalestrantesComponent },
    { path: 'contatos', component: ContatosComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

