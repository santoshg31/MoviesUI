import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss']
})
export class MyMoviesComponent implements OnInit {

  constructor(public _moviesService:MoviesService) { }
  movies:Movie[] = [];
  errorMessage:string = '';
  noMoviesMessage:string = 'You have not booked any movies yet.';
  ngOnInit(): void {
    this._moviesService.getMyMovies().subscribe(   
      movies => {
        this.movies = movies;        
      },
      error =>{
        this.errorMessage = error;
      }
    );

  }

}
