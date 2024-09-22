import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    NgbAlertModule,
    NgbHighlight,
    NgbCollapseModule
  ],
  exports: [ NgbTypeaheadModule,
    NgbAlertModule,
    NgbHighlight,
    NgbCollapseModule]
})
export class BootstrapModule { }
