import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ChoferesForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {

    this.baseForm = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      fechaNac:[formatDate(Date.now(), 'yyyy-MM-dd', 'en'),[Validators.required],],
      estado: [true],
    });
  }
}


//SACAR DE COMPONENT