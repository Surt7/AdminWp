import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BffUserDto, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  #currentUser = signal<User | null>(null);
  readonly currentUser = this.#currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN');

  login(): void {
    window.location.href = '/api/auth/login?returnUrl=http://localhost:4200/machines';
  }

  logout(): void {
    this.#currentUser.set(null);
  }

  async loadCurrentUser(): Promise<User | null> {
    try {
      const dto = await firstValueFrom(
        this.http.get<BffUserDto>('/api/auth/user', {
          withCredentials: true,
        }),
      );

      const user: User = {
        id: dto.subject,
        username: dto.username,
        name: dto.username,
        email: '',
        role: dto.roles.includes('Admin') ? 'ADMIN' : 'TECHNICIAN',
      };

      this.#currentUser.set(user);
      return user;
    } catch {
      this.#currentUser.set(null);
      return null;
    }
  }
}
