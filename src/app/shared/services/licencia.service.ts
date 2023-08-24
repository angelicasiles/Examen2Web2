import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Licencias } from '../models/licencias';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Licencias[]> {
    return this.http
      .get<Licencias[]>('http://localhost:3000/licencia')
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al adminstrador.';
    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }
    return throwError(() => new Error(mensaje));
  }
}
