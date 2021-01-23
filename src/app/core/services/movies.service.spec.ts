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
  });

  describe('getMovieById',()=>{
    it('Should return movie from the api with one httpget call',()=>{
      const movieId = 1;
      const movieDetails:Movie = {
        "movieId": 1,
        "language": "HINDI",
        "location": "DELHI",
        "plot": "Harry, Ron, and Hermione continue their quest of finding and destroying the Dark Lord's three remaining Horcruxes, the magical items responsible for his immortality. But as the mystical Deathly Hallows are uncovered, and Voldemort finds out about their mission, the biggest battle begins and life as they know it will never be the same again.",
        "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
        "soundEffects": [
          "RX6",
          "SDDS"
        ],
        "stills": [
          "https://i.imgur.com/i3aD05u.png",
          "https://i.imgur.com/ABinULO.gif",
          "https://i.imgur.com/Wflfyct.gif"
        ],
        "title": "Harry Potter and the Deathly Hallows: Part 2",
        "imdbID": "tt1201607",
        "listingType": "NOW_SHOWING",
        "imdbRating": "8.1"
      }
      moviesService.getMovieById(movieId).subscribe(
        movieDetails =>{
          expect(movieDetails).not.toBeUndefined();
        }
      );

      const req = httpMock.expectOne(`${environment.apiUrl}/movieDetails?movieId=${movieId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(movieDetails);
    })
  })

  describe('getMyMovies',()=>{
    it('Should return movies from the api with one httpget call',()=>{
      moviesService.getMyMovies().subscribe(
        movies =>{
          expect(movies).not.toBeUndefined();
        }
      );

      const req = httpMock.expectOne(`${environment.apiUrl}/myMovies`);
      expect(req.request.method).toEqual('GET');

      req.flush(movies);
    })
  });
});
