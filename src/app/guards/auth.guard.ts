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

/**
 * AuthGuard protege las rutas de la aplicación verificando el estado de autenticación del usuario. 
 * Si el usuario no está autenticado, se redirige a la página de inicio de sesión y se guarda la 
 * URL original para redirigir después del inicio de sesión exitoso. Implementa las interfaces 
 * CanActivate, CanActivateChild y CanLoad para controlar el acceso a las rutas principales y cargadas de forma perezosa.
 */
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

