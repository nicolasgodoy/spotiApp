import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { SpotifyArtist } from '../../models/spotify.models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnDestroy {

  artistas: SpotifyArtist[] = [];
  loading: boolean = false;
  private subscription?: Subscription;

  constructor(private spotify: SpotifyService) { }

  buscar(termino: string): void {
    this.loading = true;

    this.subscription?.unsubscribe();
    this.subscription = this.spotify.getArtistas(termino)
      .subscribe((data: SpotifyArtist[]) => {
        this.artistas = data;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
