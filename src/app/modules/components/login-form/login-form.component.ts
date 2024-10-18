import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    
    this.createForm();
  }

  ngOnInit() {
    // this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      return
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en login:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  // Getters para acceder fácilmente a los form controls
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
  
}
