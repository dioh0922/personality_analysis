import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginButton } from './login-button/login-button';
import { DumpBeer } from './dump/dump-beer/dump-beer';
import { DumpDiscussion } from './dump/dump-discussion/dump-discussion';
import { DumpSake } from './dump/dump-sake/dump-sake';
import { RouterModule } from '@angular/router';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    LoginButton,
    DumpBeer,
    DumpDiscussion,
    DumpSake,
    ThemeSwitcherComponent
  ],
  templateUrl: './page.html',
})
export class Page {
  protected readonly title = signal('app');
  private readonly themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      document.body.className = this.themeService.theme();
    });
  }
}
