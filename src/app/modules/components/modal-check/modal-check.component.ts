import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-check',
  templateUrl: './modal-check.component.html',
  styleUrls: ['./modal-check.component.scss'],
})
export class ModalCheckComponent  implements OnInit {

  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegions: { [key: string]: boolean } = {};

  constructor(
    public modalController: ModalController,
    private toastController: ToastController
  ) { }
  
  ngOnInit() {}

  setElements() {
    // Obtener solo las regiones seleccionadas (donde el valor sea true)
    const selectedRegionsList = Object.keys(this.selectedRegions).filter(region => this.selectedRegions[region]);
  
    // Devolver los datos seleccionados al componente padre
    this.modalController.dismiss({
      selectedRegions: selectedRegionsList
    });
  }

}
