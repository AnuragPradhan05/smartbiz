import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // This is your root standalone component
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import 'zone.js';  // 👈 Required for Angular's change detection to work


bootstrapApplication(App, {
  providers: [
       provideRouter(appRoutes)]
});
