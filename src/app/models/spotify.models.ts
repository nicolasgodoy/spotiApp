// Spotify API Models
export interface SpotifyImage {
    height: number;
    url: string;
    width: number;
}

export interface SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    followers?: {
        href: string | null;
        total: number;
    };
    genres?: string[];
    href: string;
    id: string;
    images?: SpotifyImage[];
    name: string;
    popularity?: number;
    type: 'artist';
    uri: string;
}

export interface SpotifyAlbum {
    album_type: string;
    artists: SpotifyArtist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: 'album';
    uri: string;
}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
}

// API Response Models
export interface NewReleasesResponse {
    albums: {
        href: string;
        items: SpotifyAlbum[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
}

export interface ArtistsSearchResponse {
    artists: {
        href: string;
        items: SpotifyArtist[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
}

export interface TopTracksResponse {
    tracks: SpotifyTrack[];
}
