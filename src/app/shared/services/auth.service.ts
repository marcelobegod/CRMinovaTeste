import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'usuarioLogado';

  // 🔹 usuário e senha "fake"
  private readonly mockUser = {
    email: 'admin@crm.com',
    senha: '123456'
  };

  estaLogado(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  login(email: string, senha: string): boolean {
    if (email === this.mockUser.email && senha === this.mockUser.senha) {
      localStorage.setItem(this.USER_KEY, JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }
}
