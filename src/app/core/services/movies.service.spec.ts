import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/movie';
import { environment } from 'src/environments/environment';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let movies:Movie[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
        providers:[
            MoviesService
        ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    moviesService = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(moviesService).toBeTruthy();
  });

  describe('getMovies',()=>{
    it('Should return movies from the api with one httpget call',()=>{
      moviesService.getMovies().subscribe(
        movies =>{
          expect(movies).not.toBeUndefined();
        }
      );

      const req = httpMock.expectOne(`${environment.apiUrl}`);
      expect(req.request.method).toEqual('GET');

      req.flush(movies);
    })
  })
});
