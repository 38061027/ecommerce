import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

const MODULES = [
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
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
