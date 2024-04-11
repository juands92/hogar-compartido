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

  constructor(private router: Router) {
    // Escucha los eventos del router
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Establece showComponent a true si la ruta actual no es '/landing'
        this.showPanelNavbar =
          event.url !== '/landing' && event.url !== '/login';
      }
    });
  }
}
