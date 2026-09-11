import { computed, Injectable, signal } from '@angular/core';
import { User, LoginCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #currentUser = signal<User | null>(null);
  readonly currentUser = this.#currentUser.asReadonly();

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN');

  login(credential: LoginCredentials): void {
    this.#currentUser.set({
      id: 'u1',
      username: credential.username,
      email: 'phil@yahoo.fr',
      name: 'Admin Master',
      role: 'ADMIN',
    });
  }


  logout(): void {
    this.#currentUser.set(null);
  }

}
