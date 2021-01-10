import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(public _moviesService:MoviesService) { }
  movies:Movie[] = [];
  errorMessage:string = '';
  ngOnInit(): void {
    this._moviesService.getMovies().subscribe(
      movies => {
        this.movies = movies;
      },
      error =>{
        this.errorMessage = error;
      }
    )
  }

}
