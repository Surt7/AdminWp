import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #isDarkMode = signal<boolean>(ThemeService.getSavedTheme());
  readonly isDarkMode = this.#isDarkMode.asReadonly();

  constructor() {
    document.documentElement.classList.toggle('dark', this.#isDarkMode());
  }

  toggleThemeDarkLightMode(): void {
    this.#isDarkMode.update((current) => {
      const next = !current;

      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  private static getSavedTheme(): boolean {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('app_theme');
    return saved !== null ? saved === 'dark' : true;
  }
}
