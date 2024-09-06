import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
const MODULES = [
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MODULES
  ],
  exports:[MODULES]
})
export class MaterialModule { }
