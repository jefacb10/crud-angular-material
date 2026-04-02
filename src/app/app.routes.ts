import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro';
import { ConsultaComponent } from './consulta/consulta';

export const routes: Routes = [
    { path: 'consulta', component: ConsultaComponent },
    { path: 'formulario', component: CadastroComponent }
];
