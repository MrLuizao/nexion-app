import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-date',
  templateUrl: './modal-date.component.html',
  styleUrls: ['./modal-date.component.scss'],
})
export class ModalDateComponent  implements OnInit {

  startDate: any;
  endDate: any;

  constructor(
    public modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {}


  async accept() {
    if (this.startDate && this.endDate) {
      this.modalController.dismiss({
        startDate: this.startDate,
        endDate: this.endDate,
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, seleccione ambas fechas.',
        duration: 2000, 
        position: 'top',
        color: 'warning',
      });
      toast.present();
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
