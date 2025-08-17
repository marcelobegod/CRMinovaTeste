import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SobreComponent } from './pages/sobre/sobre';
import { ContatoComponent } from './pages/contato/contato';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'sobre', component: SobreComponent, canActivate: [AuthGuard] },
  { path: 'contato', component: ContatoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // fallback
];
