import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TableDataComponent } from './table-data/table-data.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    TableDataComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginFormComponent,
    TableDataComponent
  ]
})
export class ComponentsModule { }
