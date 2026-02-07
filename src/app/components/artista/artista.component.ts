import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { SpotifyArtist, SpotifyTrack } from '../../models/spotify.models';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnDestroy {

  artista?: SpotifyArtist;
  topTracks: SpotifyTrack[] = [];
  loadingArtist: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: ActivatedRoute,
    private spotify: SpotifyService
  ) {
    this.loadingArtist = true;

    const paramsSub = this.router.params.subscribe((params: Params) => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
    this.subscriptions.push(paramsSub);
  }

  getArtista(id: string): void {
    this.loadingArtist = true;
    const artistaSub = this.spotify.getArtista(id)
      .subscribe((artista: SpotifyArtist) => {
        this.artista = artista;
        this.loadingArtist = false;
      });
    this.subscriptions.push(artistaSub);
  }

  getTopTracks(id: string): void {
    const tracksSub = this.spotify.getTopTracks(id)
      .subscribe((topTracks: SpotifyTrack[]) => {
        this.topTracks = topTracks;
      });
    this.subscriptions.push(tracksSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
