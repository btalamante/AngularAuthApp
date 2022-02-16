import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatosLogin, DatosUsuario, LoginError, Usuario } from '../interfaces/interface';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl  : string = environment.baseURL;
  private _usuario! : Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  login(datos: DatosUsuario) {
    const url   = `${this._baseUrl}/auth/`;
    const body  = { email: datos.email, password: datos.password }
    return this.http.post<DatosLogin>(url, body)
    .pipe(
      tap( resp => {
        if ( resp.ok ) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name  : resp.name!,
            uid   : resp.uid!,
            email : resp.email!
          }
        }
      } ),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );
  }

  validarToken(): Observable<boolean>{
    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set( 'x-token', localStorage.getItem('token') || '' );
    return this.http.get<DatosLogin>( url, { headers } )
    .pipe(
      map( resp => {
        localStorage.setItem( 'token', resp.token! );
          this._usuario = {
            name  : resp.name!,
            uid   : resp.uid!,
            email : resp.email!
          }
        return resp.ok;
      } ),
      catchError( err => of( false ) )
    );
  }

  logOut() {
    localStorage.removeItem( 'token' );
  }

  registro( datosUsuario: DatosUsuario ) {
    const url = `${this._baseUrl}/auth/new`;
    const body  = { email: datosUsuario.email, password: datosUsuario.password, name: datosUsuario.name }
    return this.http.post<DatosLogin>(url, body)
    .pipe(
      tap( resp => {
        if (resp.ok){
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name  : resp.name!,
            uid   : resp.uid!,
            email : resp.email!
          }
        }
      } ),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );
  }
}
