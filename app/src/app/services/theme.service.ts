import { Injectable, signal } from '@angular/core';

export type Theme = 'light-theme' | 'dark-theme' | 'soft-theme' | 'dashboard';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<Theme>('soft-theme');

  get theme() {
    return this.currentTheme.asReadonly();
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('light-theme', 'dark-theme', 'soft-theme', 'dashboard');
      document.body.classList.add(theme);
    }
  }
}
