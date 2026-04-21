import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from './services/theme.service';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { LoginButton } from './login-button/login-button';
import { DumpBeer } from './dump/dump-beer/dump-beer';
import { DumpDiscussion } from './dump/dump-discussion/dump-discussion';
import { DumpSake } from './dump/dump-sake/dump-sake';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ThemeSwitcherComponent,
    LoginButton,
    DumpBeer,
    DumpDiscussion,
    DumpSake
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app');
  protected readonly themeService = inject(ThemeService);
}
