import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterConfig } from 'src/app/shared/interfaces/filter-config.interface';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})

/**
 * Este componente permite a los usuarios aplicar filtros sobre una lista de datos.
 * Los filtros incluyen un campo de texto, selección de regiones y un rango de fechas.
 * Se encarga de emitir eventos cuando los filtros cambian y proporciona
 * métodos para abrir modales de selección de fechas y regiones.
 */

export class FilterInputComponent  implements OnInit {

  @Input() startDate?: Date;
  @Input() endDate?: Date;
  @Input() selectedRegions?: string[];
  @Input() filterText: string = '';

  @Output() filterChange = new EventEmitter<FilterConfig>();
  @Output() datePickerOpen = new EventEmitter<void>();
  @Output() regionPickerOpen = new EventEmitter<void>();

  hidden = true;

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  toggleFilters() {
    this.hidden = !this.hidden;
  }

  onTextFilterChange() {
    this.emitFilterChange();
  }

  openDatePickerModal() {
    this.datePickerOpen.emit();
  }

  openCheckModal() {
    this.regionPickerOpen.emit();
  }

  clearDateFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.emitFilterChange();
  }

  clearRegionFilter() {
    this.selectedRegions = undefined;
    this.emitFilterChange();
  }

  applyFilters() {
    this.emitFilterChange();
  }

  private emitFilterChange() {
    this.filterChange.emit({
      startDate: this.startDate,
      endDate: this.endDate,
      selectedRegions: this.selectedRegions,
      filterText: this.filterText
    });
  }

}
