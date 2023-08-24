import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Licencias } from 'src/app/shared/models/licencias';
import { LicenciaService } from 'src/app/shared/services/licencia.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.scss']
})
export class LicenciasComponent {

  titulo = 'LISTA DE LICENCIAS';
  displayedColumns: string[] = [
    'id',
    'nombre',
    'acciones'
  ];

  dataSource = new MatTableDataSource();

  constructor(
    private srvLicencias: LicenciaService,
    public dialog: MatDialog,
    private mensajeria: ToastrService,
    private dialogRef: MatDialogRef<LicenciasComponent>
  ) {}

  ngOnInit() {
    this.cargarlista()
  }

  cargarlista(){
    this.srvLicencias.getAll().subscribe(
      (datos) => {
        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error("Vacio");
        setTimeout(() => {
          this.mensajeria.clear(); 
        }, 1500);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Obtener(mostarLicencias: any): void {
    this.dialogRef.close(mostarLicencias);
  }


  

}
