import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';

  login(username: string, password: string): boolean {
    if (username.trim() && password.trim()) {
      localStorage.setItem(this.tokenKey, 'fake-jwt-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
