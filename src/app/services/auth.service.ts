import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // (provideIn) Decorador - Forma automatica de importar servicios - Sin agregar la importacion en app.module
})
export class AuthService {

  constructor( private http: HttpClient) { 
    console.log ('spotify service listo')
  }

  getToken(): Observable<HttpEvent<any>>
  { 
    const url = `https://accounts.spotify.com/api/token`;

    const httpParams = new HttpParams()
    .set('grant_type', 'client_credentials')
    .set('client_id', 'ac28c705b17340f7b73f29a583807192')
    .set('client_secret', 'b72780dacea441e980cbb9dcfd349080')

    return this.http.post<any>(url, httpParams);
  }
}
   
  


