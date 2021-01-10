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
  ngOnInit(): void {
    this._moviesService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        this.filteredMovies = [...movies];
      },
      error =>{
        this.errorMessage = error;
      }
    )
  };

  onMovieFilterChange(movieFilter:MovieFilter){
    this.filteredMovies = this.movies.filter(movie=> (movie.title.toLowerCase().indexOf(movieFilter.searchTitle.toLowerCase()) !== -1) &&
                                                      (movieFilter.language ===''|| movieFilter.language.toLowerCase() === movie.language.toLowerCase())
                                             );
  }

}
