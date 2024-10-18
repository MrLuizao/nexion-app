import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  CanActivateChild,
  CanLoad,
  Route, 
  UrlSegment, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuth(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> {
    return this.checkAuth('/' + segments.map(s => s.path).join('/'));
  }

  private checkAuth(url: string): Observable<boolean> {
    return this.authService.isAuthenticated$().pipe( // Llamar a isAuthenticated$ como función
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }

        // Guardar la URL intentada para redirigir después del login
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: url }
        });
        return false;
      }),
      take(1)
    );
  }
}

