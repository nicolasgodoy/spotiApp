import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAlbum, SpotifyArtist } from '../../models/spotify.models';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {

  @Input() items: (SpotifyAlbum | SpotifyArtist)[] = [];

  constructor(private router: Router) { }

  verArtista(item: SpotifyAlbum | SpotifyArtist): void {
    let artistaId: string;

    if (item.type === 'artist') {
      artistaId = item.id;
    } else {
      // It's an album, narrowing works automatically now
      artistaId = item.artists[0].id;
    }

    this.router.navigate(['/artist', artistaId]);
  }
}
