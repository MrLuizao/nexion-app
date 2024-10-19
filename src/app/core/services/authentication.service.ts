import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { DecodedToken, LoginRequest, LoginResponse } from 'src/app/shared/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})

/**
 * Este servicio gestiona la autenticación de usuarios en la aplicación. 
 * Proporciona métodos para iniciar sesión, cerrar sesión, verificar el estado de autenticación, 
 * y manejar el token JWT almacenado en el localStorage.
 */

export class AuthenticationService {

  private readonly JWT_TOKEN_KEY = 'jwt_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return of({
      user: {
        id: 1,
        email: credentials.email,
        name: 'Usuario Demo'
      },
      token: this.generateDemoToken(credentials)
    }).pipe(
      delay(2000),
      tap(response => {
        this.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    localStorage.clear();
  }

  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        return this.jwtHelper.decodeToken(token);
      } catch (error) {
        console.error('Error decodificando token:', error);
        return null;
      }
    }
    return null;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    return this.jwtHelper.isTokenExpired(token);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, token);
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      const isExpired = this.isTokenExpired();
      this.isAuthenticatedSubject.next(!isExpired);
      if (isExpired) {
        this.logout();
      }
    }
  }

  private generateDemoToken(credentials: LoginRequest): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }

}
