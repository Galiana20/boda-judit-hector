import { Injectable, signal } from '@angular/core';

const PASSWORD = 'patata';
const STORAGE_KEY = 'auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated = signal(sessionStorage.getItem(STORAGE_KEY) === 'true');

  tryLogin(password: string): boolean {
    if (password.trim().toLowerCase() === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }
}
