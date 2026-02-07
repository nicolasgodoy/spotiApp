import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { SpotifyAlbum } from '../../models/spotify.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnDestroy {

  nuevasCanciones: SpotifyAlbum[] = [];
  loading: boolean = false;
  private subscription?: Subscription;

  constructor(private spotify: SpotifyService) {
    this.loading = true;

    this.subscription = this.spotify.getNewReleases()
      .subscribe((data: SpotifyAlbum[]) => {
        this.nuevasCanciones = data;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
