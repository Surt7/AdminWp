import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './core/routing/custom-route-reuse-strategy';
import { AuthService } from './core/auth/service/auth.service';

const ArcadePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // color base
      600: '#dc2626', // (hover)
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f7f7f7', // High-contrast bright text
          100: '#ededed', // Primary headings / titles
          200: '#d6d6d6', // Body text / labels
          300: '#b0b0b0', // Secondary text / placeholders
          400: '#858585', // Muted text / subtle icons
          500: '#5c5c5c', // Active / focused borders
          600: '#3d3d3d', // Subtle borders / dividers
          700: '#2b2b2b', // Card hover / elevated surfaces
          800: '#1f1f1f', // Main container borders
          900: '#141414', // Cards & sidebar background
          950: '#0a0a0a', // App root background
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    providePrimeNG({
      theme: {
        preset: ArcadePreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideHttpClient(),
  ],
};
