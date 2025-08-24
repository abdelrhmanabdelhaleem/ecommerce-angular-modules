import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../models/auth/iuser';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor() {}
  userData: any;
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }
  getUserData(): IUser | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
