import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TableDataComponent } from './table-data/table-data.component';
import { ModalDateComponent } from './modal-date/modal-date.component';
import { ModalCheckComponent } from './modal-check/modal-check.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    TableDataComponent,
    ModalDateComponent,
    ModalCheckComponent
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
    ModalCheckComponent
  ]
})
export class ComponentsModule { }
