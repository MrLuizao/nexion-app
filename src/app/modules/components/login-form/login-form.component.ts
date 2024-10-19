import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})

/**
 * Este componente gestiona el formulario de inicio de sesión para los usuarios.
 * Se encarga de la validación del formulario, la autenticación del usuario y la
 * navegación a la página principal después de un inicio de sesión exitoso.
 */

export class LoginFormComponent  implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
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

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.messageInfo("Login exitoso", 'primary');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          this.messageInfo(error.error, 'danger');
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

  async messageInfo(msg: string, type: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000, 
      position: 'bottom',
      color: type,
    });
    toast.present();
  }
  
}
