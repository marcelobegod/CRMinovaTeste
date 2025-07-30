import { ContatoComponent } from './pages/contato/contato';
import { SobreComponent } from './pages/sobre/sobre';
import { HomeComponent } from './pages/home/home';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'contato', component: ContatoComponent },
];
