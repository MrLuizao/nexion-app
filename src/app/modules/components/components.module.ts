import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TableDataComponent } from './table-data/table-data.component';
import { ModalDateComponent } from './modal-date/modal-date.component';
import { ModalCheckComponent } from './modal-check/modal-check.component';
import { PaginateTableComponent } from './paginate-table/paginate-table.component';
import { FilterInputComponent } from './filter-input/filter-input.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    TableDataComponent,
    ModalDateComponent,
    ModalCheckComponent,
    PaginateTableComponent,
    FilterInputComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginFormComponent,
    TableDataComponent,
    ModalDateComponent,
    ModalCheckComponent,
    PaginateTableComponent,
    FilterInputComponent
  ]
})
export class ComponentsModule { }
