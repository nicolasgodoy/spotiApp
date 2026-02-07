import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyTrack,
  NewReleasesResponse,
  ArtistsSearchResponse,
  TopTracksResponse
} from '../models/spotify.models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  private getQuery<T>(query: string): Observable<T> {
    const url = `https://api.spotify.com/v1/${query}`;
    return this.http.get<T>(url);
  }

  getNewReleases(): Observable<SpotifyAlbum[]> {
    return this.getQuery<NewReleasesResponse>('browse/new-releases')
      .pipe(map((data: NewReleasesResponse) => data.albums.items));
  }

  getArtistas(termino: string): Observable<SpotifyArtist[]> {
    return this.getQuery<ArtistsSearchResponse>(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: ArtistsSearchResponse) => data.artists.items));
  }

  getArtista(id: string): Observable<SpotifyArtist> {
    return this.getQuery<SpotifyArtist>(`artists/${id}`);
  }

  getTopTracks(id: string): Observable<SpotifyTrack[]> {
    return this.getQuery<TopTracksResponse>(`artists/${id}/top-tracks?country=us`)
      .pipe(map((data: TopTracksResponse) => data.tracks));
  }
}
