import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-check',
  templateUrl: './modal-check.component.html',
  styleUrls: ['./modal-check.component.scss'],
})
export class ModalCheckComponent  implements OnInit {

  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegions: { [key: string]: boolean } = {};

  constructor(
    public modalController: ModalController
  ) { }
  
  ngOnInit() {}

  setElements() {
    const selectedRegionsList = Object.keys(this.selectedRegions).filter(region => this.selectedRegions[region]);
    this.modalController.dismiss({
      selectedRegions: selectedRegionsList
    });
  }

}
