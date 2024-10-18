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

    // MOCK TEST LVR START
    this.countries = COUNTRIES;
    this.totalCountries = this.countries.length;
    this.filteredCountries = [...this.countries];
    this.updatePaginatedCountries();
    // MOCK TEST LVR FINISH

    // this.listDataService.getAllCountries().subscribe({
    //   next: (next) => {

    //     this.countries = next;  // Guardar todos los países
    //     this.totalCountries = next.length;  // Total de países
    //     console.log(this.countries);

    //       // this.updatePaginatedCountries()
    //     this.filteredCountries = [...this.countries]; // Inicializa el array filtrado
    //     this.updatePaginatedCountries(); // Actualiza paginados inicialmente

    //   },
    //   error: (error) => {
    //     console.error('Error en login:', error);
    //     this.isLoading = false;
    //   },
    //   complete: () => {
    //     this.isLoading = false;
    //   }
    // });
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
  
  goToFirstPage() {
    this.currentPage = 0;
    this.updatePaginatedCountries();
  }

  goToLastPage() {
    this.currentPage = this.getTotalPages() - 1;
    this.updatePaginatedCountries();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedCountries();
    }
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.filteredCountries.length) {
      this.currentPage++;
      this.updatePaginatedCountries();
    }
  }

  getTotalPages() {
    return Math.ceil(this.filteredCountries.length / this.itemsPerPage);
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

}
