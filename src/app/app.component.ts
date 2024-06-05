import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hogar-compartido';
  showPanelNavbar = true;
  allowedRoutes = [
    '/overview',
    '/profile',
    '/home',
    '/calendar',
    '/expenses',
    '/tasks',
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showPanelNavbar = this.allowedRoutes.includes(event.url);
      }
    });
  }
}
