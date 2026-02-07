import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';


//importar rutas

import { ROUTES } from './app.routes';


//Pipes
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';


import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { AuthInterceptor } from './services/AuthInterceptor';







@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        ArtistaComponent,
        NavbarComponent,
        NoimagePipe,
        DomseguroPipe,
        TarjetasComponent,
        LoadingComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        RouterModule.forRoot(ROUTES, { useHash: true })], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

