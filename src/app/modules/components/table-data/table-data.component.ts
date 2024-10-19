import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListRestService } from 'src/app/core/services/list-rest.service';
import { ModalDateComponent } from '../modal-date/modal-date.component';
import { COUNTRIES } from 'src/app/assets/list-mock';
import { ModalCheckComponent } from '../modal-check/modal-check.component';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})

/**
 * Este componente gestiona la visualización y paginación de una lista de países.
 * Permite filtrar la lista según texto, región y rango de fechas, además de gestionar
 * la paginación de los elementos mostrados.
 */

export class TableDataComponent  implements OnInit {
  
  isLoading = false;
  hidden = true;

  countries: any[] = []; 
  totalCountries: any;
  filteredCountries: any[] = []; 
  paginatedCountries: any[] = [];  
  filterText: string = '';
  currentPage: number = 0;
  itemsPerPage: number = 10;

  startDate: any;
  endDate: any;
  selectedRegions: any;

  constructor( private listDataService: ListRestService, public modalController: ModalController) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadCountries();
    this.updatePaginatedCountries();
  }

  loadCountries(){

    // // MOCK TEST LVR START
    // this.countries = COUNTRIES;
    // this.totalCountries = this.countries.length;
    // this.filteredCountries = [...this.countries];
    // this.updatePaginatedCountries();
    // // MOCK TEST LVR FINISH

    this.listDataService.getAllCountries().subscribe({
      next: (next) => {

        this.countries = next;
        this.totalCountries = next.length;
        console.log(this.countries);

        this.filteredCountries = [...this.countries];
        this.updatePaginatedCountries();

      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getPaginatedCountries(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCountries.slice(startIndex, endIndex);
  }

  updatePaginatedCountries() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCountries = this.filteredCountries.slice(startIndex, endIndex);
  }

  filterCountries() {
    if(this.filterText === ''){
      this.filteredCountries = [...this.countries];
      this.updatePaginatedCountries();
      this.applyRegionFilter();
      return
    }

    this.filteredCountries = this.filteredCountries.filter(country =>
      country.name.common.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.currentPage = 0; 
    this.updatePaginatedCountries();
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedCountries();
  }

  getCountryFlagUrl(cca2: string): string {
    return `https://flagcdn.com/w320/${cca2.toLowerCase()}.png`;
  }

  async openDatePickerModal() {
    const modal = await this.modalController.create({
      component: ModalDateComponent,
    });

    modal.onDidDismiss().then((result) => {
      console.log('result', result);

      if (result.data) {
        this.startDate = result.data.startDate;
        this.endDate = result.data.endDate;
      }

    });
    return await modal.present();
  }

  clearDatePickFilter(){
    this.startDate = null;
    this.endDate = null;
    this.updatePaginatedCountries();
  }

  async openCheckModal() {
    const modal = await this.modalController.create({
      component: ModalCheckComponent,
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.selectedRegions = result.data.selectedRegions;
      }
    });
  
    return await modal.present();
  }
  
  applyRegionFilter() {
    if (this.selectedRegions && this.selectedRegions.length > 0) {
      this.filteredCountries = this.countries.filter(country => 
        this.selectedRegions.includes(country.region)
      );
    } else {
      this.filteredCountries = [...this.countries];
    }
  
    this.currentPage = 0;
    this.updatePaginatedCountries();
    this.paginatedCountries = this.getPaginatedCountries();

  }

  clearFilterRegion(){
    this.selectedRegions = null;
    this.filteredCountries = [...this.countries];
    this.updatePaginatedCountries();
  }

  applyFilters() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      this.filteredCountries = this.countries.filter((country) => {
        const countryDate = new Date(country.date); // Asegúrate de que 'date' sea la propiedad correcta en tu objeto
        return countryDate >= start && countryDate <= end;
      });
    } else {
      // Puedes mostrar un mensaje de error si las fechas no están seleccionadas
    }
  }

  onFilterChange(filters: any) {
    this.filterText = filters.filterText || '';
    this.startDate = filters.startDate;
    this.endDate = filters.endDate;
    this.selectedRegions = filters.selectedRegions;
    
    this.applyAllFilters();
  }

  async onDatePickerOpen() {
    const modal = await this.modalController.create({
      component: ModalDateComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.startDate = result.data.startDate;
        this.endDate = result.data.endDate;
        this.applyAllFilters();
      }
    });

    return await modal.present();
  }

  async onRegionPickerOpen() {
    const modal = await this.modalController.create({
      component: ModalCheckComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.selectedRegions = result.data.selectedRegions;
        this.applyAllFilters();
      }
    });

    return await modal.present();
  }

  private applyAllFilters() {
    this.filteredCountries = [...this.countries];

    if (this.filterText) {
      this.filteredCountries = this.filteredCountries.filter(country =>
        country.name.common.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }

    // Aplicar filtro de regiones
    if (this.selectedRegions && this.selectedRegions.length > 0) {
      this.filteredCountries = this.filteredCountries.filter(country => 
        this.selectedRegions.includes(country.region)
      );
    }

    // Aplicar filtro de fechas
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      this.filteredCountries = this.filteredCountries.filter((country) => {
        const countryDate = new Date(country.date);
        return countryDate >= start && countryDate <= end;
      });
    }

    // Resetear la paginación
    this.currentPage = 0;
    this.updatePaginatedCountries();
  }

}
