import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../store/state/state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store
      .select((state) => state.auth.isAuthenticated)
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['/landing']); // Redirige al usuario a la landing page si no está autenticado
            return false;
          }
        })
      );
  }
}
