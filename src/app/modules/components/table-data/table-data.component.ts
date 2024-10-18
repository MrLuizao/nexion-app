import { Component, OnInit } from '@angular/core';
import { ListRestService } from 'src/app/core/services/list-rest.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent  implements OnInit {
  
  isLoading = false;

  countries: any[] = []; 
  totalCountries: any;
  filteredCountries: any[] = []; 
  paginatedCountries: any[] = [];  
  filterText: string = '';
  currentPage: number = 0;
  itemsPerPage: number = 10;

  constructor( private listDataService: ListRestService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadCountries();
    this.updatePaginatedCountries();
  }

  loadCountries(){
    this.listDataService.getAllCountries().subscribe({
      next: (next) => {

        this.countries = next;  // Guardar todos los países
        this.totalCountries = next.length;  // Total de países
        console.log(this.countries);

          // this.updatePaginatedCountries()
        this.filteredCountries = [...this.countries]; // Inicializa el array filtrado
        this.updatePaginatedCountries(); // Actualiza paginados inicialmente

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

  updatePaginatedCountries() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCountries = this.filteredCountries.slice(startIndex, endIndex);
  }

  filterCountries() {
    this.filteredCountries = this.countries.filter(country =>
      country.name.common.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.currentPage = 0; // Resetea a la primera página
    this.updatePaginatedCountries(); // Actualiza los países paginados
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

}
