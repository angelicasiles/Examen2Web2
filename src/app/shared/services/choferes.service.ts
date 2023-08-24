import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Chofer } from '../models/choferes';


@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  constructor(private http: HttpClient) {}

  

  guardar(Choferes: any): Observable<Chofer> {
    return this.http
      .post<Chofer>('http://localhost:3000/chofer', Choferes)
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