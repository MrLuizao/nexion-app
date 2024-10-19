import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../core/services/authentication.service";
import { map, Observable, take } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

/**
 * PublicGuard permite el acceso a rutas públicas solo si el usuario no está autenticado. 
 * Si el usuario ya está autenticado, se redirige a la página de inicio ('/home'). 
 * Implementa la interfaz CanActivate para controlar el acceso a las rutas públicas.
 */

export class PublicGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}

  