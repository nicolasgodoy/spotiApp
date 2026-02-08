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
    this.spotify.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.loading = false;
      }
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

  buscarByCategoria(nombre: string): void {
    const input = document.querySelector('input') as HTMLInputElement;
    if (input) {
      input.value = nombre;
    }
    this.buscar(nombre);
  }

  getCategoryColor(index: number): string {
    const colors = [
      '#E13300', '#1E3264', '#E8115B', '#148A08', '#D84000',
      '#8D67AB', '#7358FF', '#E1118C', '#503750', '#006450'
    ];
    return colors[index % colors.length];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
