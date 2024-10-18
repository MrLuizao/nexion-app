import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterConfig } from 'src/app/shared/interfaces/filter-config.interface';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
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
