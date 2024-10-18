import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../core/services/authentication.service";
import { map, Observable, take } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$().pipe( // Llamar a isAuthenticated$ como método
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

  