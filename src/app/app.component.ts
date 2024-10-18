import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private authService: AuthenticationService, public router: Router, private toastController: ToastController) {}

  public alertButtons = [
    {
      text: 'Cancelar',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Confirmar',
      handler: () => {
        this.authService.logout();
        this.router.navigateByUrl("");
        this.showConfirmAlert("Se cerró la sesión", "warning")
      }
    },
  ];

  async showConfirmAlert(msg: string, type: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000, 
      position: 'bottom',
      color: type,
    });
    toast.present();
  }
}
