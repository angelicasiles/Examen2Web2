import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferesRoutingModule } from './choferes-routing.module';
import { ChoferesComponent } from './choferes.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ChoferesComponent,
    LicenciasComponent
  ],
  imports: [
    CommonModule,
    ChoferesRoutingModule,
    MaterialModule
  ]
})
export class ChoferesModule { }
