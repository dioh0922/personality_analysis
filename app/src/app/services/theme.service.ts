import { Injectable, signal } from '@angular/core';

export type Theme = 'light-theme' | 'dark-theme' | 'soft-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<Theme>('light-theme');

  get theme() {
    return this.currentTheme.asReadonly();
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }
}
