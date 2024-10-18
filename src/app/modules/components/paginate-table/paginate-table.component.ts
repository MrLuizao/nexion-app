import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginate-table',
  templateUrl: './paginate-table.component.html',
  styleUrls: ['./paginate-table.component.scss'],
})
export class PaginateTableComponent  implements OnInit {

  @Input() currentPage: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit() {}


  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToFirstPage(): void {
    if (this.currentPage !== 0) {
      this.pageChange.emit(0);
    }
  }

  goToLastPage(): void {
    const lastPage = this.getTotalPages() - 1;
    if (this.currentPage !== lastPage) {
      this.pageChange.emit(lastPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.itemsPerPage < this.totalItems) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

}
