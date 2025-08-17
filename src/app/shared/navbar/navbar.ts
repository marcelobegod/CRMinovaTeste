import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  executarBusca(termo: string) {
    console.log('Termo pesquisado:', termo);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
