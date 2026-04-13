import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { Page } from './app/page';
import { ThemeService } from './app/services/theme.service';
import { importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

bootstrapApplication(Page, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideRouter(routes)
  ]
})
  .then((appRef) => {
    const themeService = appRef.injector.get(ThemeService);
    document.body.className = themeService.theme();
  })
  .catch((err) => console.error(err));
