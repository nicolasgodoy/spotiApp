import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    const url = `https://accounts.spotify.com/api/token`;

    const httpParams = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.spotify.clientId)
      .set('client_secret', environment.spotify.clientSecret);

    return this.http.post<any>(url, httpParams);
  }
}
