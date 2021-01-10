import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _http:HttpClient) { }

  getMovies():Observable<Movie[]>{
    return this._http.get<Movie[]>(`${environment.apiUrl}`);
  }

  getMovieById(movieId:number):Observable<Movie>{
    return this._http.get<Movie>(`${environment.apiUrl}/movieDetails?movieId=${movieId}`);
  }
}
