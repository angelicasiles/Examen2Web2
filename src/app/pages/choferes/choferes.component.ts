import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';;
import { ChoferesForm } from 'src/app/shared/component/formsModels/choferesForms';
import { ToastrService } from 'ngx-toastr';
import { ChoferService } from 'src/app/shared/services/choferes.service';
import { FormGroup } from '@angular/forms';
import { Licencias } from 'src/app/shared/models/licencias';
import { LicenciasComponent } from './licencias/licencias.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent {
  titulo = 'Datos Personales';
  choferFormsGroup: FormGroup
  selecccionarLicencia: any[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'acciones'
  ];
  constructor(
    public choferesform: ChoferesForm,
    private mensajeria: ToastrService,
    private srvChofer: ChoferService,
    private choferForms: ChoferesForm,
    public dialog: MatDialog,
   
  ) { }

  dataSource = new MatTableDataSource();
  ngOnInit() {
    this.titulo = '';
    this.choferFormsGroup = this.choferForms.baseForm
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Abrir(mostrarlin?: Licencias) {
    const dialogModal = this.dialog.open(LicenciasComponent, {
      width: '800px',
      height: '800px',
      data: { mostrarlin },
    });

    dialogModal.afterClosed().subscribe((licen: Licencias) => {
      if (licen) {
        let verificarLicencia = this.selecccionarLicencia.find((sharedLicen) => sharedLicen.id === licen.id)
        if (!verificarLicencia) {
          this.selecccionarLicencia.push(licen)
          this.dataSource.data = this.selecccionarLicencia//Esto hace que pinte en la tabla

        } else {
          this.mensajeria.error("NO SE PUEDE SELECCIONAR LA MISMA LICENCIA");
        }
      }
    });
  }

  // guardar() {
  //   if (!this.selecccionarLicencia) {
  //     return this.mostrarError('Indique el chofer');
  //   }
  //   if (this.selecccionarLicencia.length === 0) {
  //     return this.mostrarError('Indique al menos 1 licencia');
  //   }

  //   try {
  //     const choferGuardar = {
  //       chofere: this.choferForms.baseForm.value,
  //       licencias: this.selecccionarLicencia.map(licen => ({ Id: licen.id }))
  //     };

  //     this.srvChofer.guardar(choferGuardar).subscribe(
  //       () => this.mensajeYReset('Chofer y licencias guardados exitosamente'),
  //       error => this.mostrarError(error.error.mensaje)
  //     );
  //   } catch {
  //     this.mostrarError('Error al guardar, inténtelo de nuevo');
  //   }
  // }

  // private mostrarError(mensaje: string) {
  //   this.mensajeria.error(mensaje);
  //   setTimeout(() => this.mensajeria.clear(), 2000);
  // }

  // private mensajeYReset(mensaje: string) {
  //   this.mensajeria.success(mensaje);
  //   this.choferForms.baseForm.patchValue({
  //     cedula: 0,
  //     nombre: "",
  //     apellido1: "",
  //     apellido2: "",
  //     FechaNah: new Date(),
  //     Genero: "",
  //     Estado: true,
  //   });
  //   this.selecccionarLicencia = []; // Corregido: asignar un array vacío
  // }

  
  guardar() { 
    if (this.validarChoferYLicencias()) {
      try {
        const newChofer = this.obtenerDatosChofer();
        this.srvChofer.guardar(newChofer).subscribe(
          (response) => {
            this.procesarGuardadoExitoso();
          },
          (error) => {
            this.mensajeria.error(error.mensaje);
          }
        );
      } catch (error) {
        this.mensajeria.error('HUBO UN ERROR AL GUARDAR');
      }
    }
  }
  
  validarChoferYLicencias(): boolean {
    if (this.choferForms.baseForm.invalid) {
      this.mensajeria.error('DEBES DE INDICAR LA INFORMACIÓN DEL CHOFER');
      return false;
    } else if (this.selecccionarLicencia.length === 0) {
      this.mensajeria.error('DEBES DE INDICAR UNA LICENCIA');
      return false;
    }
    return true;
  }
  
  obtenerDatosChofer() {
    const {
      cedula,
      nombre,
      apellido1,
      apellido2,
      fechaNac,
    } = this.choferForms.baseForm.value;
  
    const licencias = this.selecccionarLicencia.map((licencia) => ({ id: licencia.id }));
  
    const newChofer = {
      cedula,
      nombre,
      apellido1,
      apellido2,
      fechaNac,
      licencias,
    };
  
    return newChofer;
  }
  
  
  
  procesarGuardadoExitoso() {
    this.mostrarMensajeExito('SE GUARDÓ CORRECTAMENTE A LA BASE DE DATOS');
    this.reiniciarFormulario();
    this.limpiarSeleccionLicencia();
    this.programarActualizacionPagina();
  }  
  
  mostrarMensajeExito(mensaje: string) {
    this.mensajeria.success(mensaje);
  }
  
  mostrarMensajeError(mensaje: string) {
    this.mensajeria.error(mensaje);
  }
  
  reiniciarFormulario() {
    const form = this.choferForms.baseForm;
    form.patchValue({
      cedula: "",
      nombre: "",
      apellido1: "",
      apellido2: "",
      fechaNac: "",
      Estado: true,
    });
  }
  
  limpiarSeleccionLicencia() {
    this.selecccionarLicencia = [];
  }
  
  programarActualizacionPagina() {
    setTimeout(() => {
      location.reload();
    }, 3000); // Esto es para que la pagina despues de haber guarde cargue aproximadamente en 3 segundos
  }
  


  Eliminar(Id: string) {
    this.selecccionarLicencia = this.selecccionarLicencia.filter(licenci => licenci.id !== Id);
    this.mostrarMensaje('Eliminado correctamente', true);
    this.dataSource.data = this.selecccionarLicencia;

  }

  private mostrarMensaje(mensaje: string, esExito: boolean) {
    const tipoMensaje = esExito ? 'success' : 'error';
    this.mensajeria[tipoMensaje](mensaje);
    setTimeout(() => this.mensajeria.clear(), 2000);
  }


  
  





}











