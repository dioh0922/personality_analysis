import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './page.html',
})
export class Page {
  protected readonly title = signal('app');
}
