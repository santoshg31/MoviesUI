import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie';
import { MovieFilter } from 'src/app/core/interfaces/movieFilter';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(public _moviesService:MoviesService) { }
  movies:Movie[] = [];
  filteredMovies:Movie[]=[];
  errorMessage:string = '';
  noMoviesMessage:string = 'No movies match filter criteria.';
  ngOnInit(): void {
    this._moviesService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        this.filteredMovies = [...movies];
        const movieFilterCache = JSON.parse(localStorage.getItem('movieFilter')) as MovieFilter;
        if(movieFilterCache != null && movieFilterCache != undefined){
          this.onMovieFilterChange(movieFilterCache);
        }
      },
      error =>{
        this.errorMessage = error;
      }
    );
    
  };

  onMovieFilterChange(movieFilter:MovieFilter){
    this.filteredMovies = this.movies.filter(movie=> (movie.title.toLowerCase().indexOf(movieFilter.searchTitle.toLowerCase()) !== -1) &&
                                                      (movieFilter.language ===''|| movieFilter.language.toLowerCase() === movie.language.toLowerCase()) &&
                                                      (movieFilter.location ===''|| movieFilter.location.toLowerCase() === movie.location.toLowerCase())
                                             );

    if(movieFilter.sortDirection === 'asc'){
      this.filteredMovies.sort((firstMovie,secondMovie) => firstMovie.title.localeCompare(secondMovie.title));
    }else if(movieFilter.sortDirection === 'desc'){
      this.filteredMovies.sort((firstMovie,secondMovie) => firstMovie.title.localeCompare(secondMovie.title)).reverse();
    }                                         
  }

}
