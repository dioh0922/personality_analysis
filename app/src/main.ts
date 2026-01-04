import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
//import { App } from './app/app';
import { Page } from './app/page';

bootstrapApplication(Page, appConfig)
  .catch((err) => console.error(err));
