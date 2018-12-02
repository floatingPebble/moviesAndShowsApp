import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Context } from './context.model';
import { Media } from './media.model';
import { environment } from '../../environments/environment';


@Injectable()
export class DataService {
  context: Context;

  constructor(private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { this.context = Context.Shows; }

  private TOP_MOVIES_URL = `${environment.apiBaseUrl}/movie/top_rated?api_key=${environment.apiKey}&language=en-US&page=1`;
  private TOP_SHOWS_URL = `${environment.apiBaseUrl}/tv/top_rated?api_key=${environment.apiKey}&language=en-US&page=1`;
  private SEARCH_MOVIES = `${environment.apiBaseUrl}/search/movie?api_key=${environment.apiKey}&language=en-US&page=1&query=`;
  private SEARCH_SHOWS = `${environment.apiBaseUrl}/search/tv?api_key=${environment.apiKey}&language=en-US&page=1&query=`;
  private MOVIE_DETAIL = `${environment.apiBaseUrl}/movie/{id}?api_key=${environment.apiKey}&language=en-US`;
  private SHOW_DETAIL = `${environment.apiBaseUrl}/tv/{id}?api_key=${environment.apiKey}&language=en-US`;

  getTopMedia(): Observable<Media[]> {
    let endpoint = this.context == Context.Movies ? this.TOP_MOVIES_URL : this.TOP_SHOWS_URL;

    return this.httpClient.get<any>(endpoint)
    .map(
      (response: any) => {
        return response.results.slice(0, 10).map((m) => new Media(m))
      });
  }


  getSearchMedia(term: string): Observable<Media[]> {
    let endpoint = this.context == Context.Movies ? this.SEARCH_MOVIES : this.SEARCH_SHOWS;

    return this.httpClient.get<any>(endpoint + term)
    .map(
      (response: any) => {
        return response.results.map((m) => new Media(m))
      });
  }

  getMediaDetail(id: string): Observable<Media> {
    let endpoint = this.context == Context.Movies ? this.MOVIE_DETAIL : this.SHOW_DETAIL;

    return this.httpClient.get<any>(endpoint.replace('{id}', id))
    .map(
      (response: any) => {
        return new Media(response);
      });
  }
}