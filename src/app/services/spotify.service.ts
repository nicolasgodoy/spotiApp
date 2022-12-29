import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // (provideIn) Decorador - Forma automatica de importar servicios - Sin agregar la importacion en app.module
})
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log ('spotify service listo')
  }

  getQuery ( query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    

    /* const headers = new HttpHeaders({
      'Authorization': 
      'Bearer BQDSLV41_lCa0xLRGqSAIQh8b3BgCp7rOyX7uTBtH2Cezf0WbcOvOn7pF5cfcA0ufcQ1DJApVIm-iWdxDac'
    }); */ // Antes se reseteaba token desde postan cada hora


    //return this.http.get(url, {headers}); // Antes se reseteaba token desde postan cada hora
    return this.http.get(url);
  }

  

  getNewReleases() {

   
    return this.getQuery('browse/new-releases')    //Ejemplo getQuery para resumir codigo
 
     .pipe(map ( (data: any) => {

      return data['albums'].items;  

    })); 
     
  }

  getArtistas( termino: string) {

   return this.getQuery(`search?q=${termino}&type=artist&limit=15`)    //Ejemplo getQuery para resumir codigo
 
  .pipe(map ( (data: any) => {

   return data['artists'].items;  

  })); 

  }

  getArtista( id: string) {

    return this.getQuery(`artists/${ id }`)    //Ejemplo getQuery para resumir codigo
  
   //.pipe(map ( (data: any) => {
 
    //return data['artists'].items;  
 
   //})); 
 
   }

   getTopTracks( id: string) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
    .pipe (map( (data: any) => data['tracks'] ));
  } 
}
   
  


