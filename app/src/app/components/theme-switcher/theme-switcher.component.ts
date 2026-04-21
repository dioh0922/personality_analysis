import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  template: `
    <button mat-button [matMenuTriggerFor]="menu">
      テーマ切替
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="setTheme('light-theme')">ライト</button>
      <button mat-menu-item (click)="setTheme('dark-theme')">ダーク</button>
      <button mat-menu-item (click)="setTheme('soft-theme')">ソフト</button>
      <button mat-menu-item (click)="setTheme('dashboard')">ダッシュボード</button>
    </mat-menu>
  `
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeService);

  setTheme(theme: Theme) {
    console.log('Switching theme to:', theme);
    this.themeService.setTheme(theme);
  }
}
