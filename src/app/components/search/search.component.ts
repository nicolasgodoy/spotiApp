import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { SpotifyArtist, SpotifyCategory } from '../../models/spotify.models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit, OnDestroy {

  artistas: SpotifyArtist[] = [];
  categories: SpotifyCategory[] = [];
  loading: boolean = false;
  private subscription?: Subscription;

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.loading = true;
    this.spotify.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

  buscar(termino: string): void {
    if (termino.length === 0) {
      this.artistas = [];
      return;
    }

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
