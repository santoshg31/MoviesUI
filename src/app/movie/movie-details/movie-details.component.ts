import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/interfaces/movie';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: Movie | undefined;
  soundEffects:string| undefined;
  constructor(public _moviesService:MoviesService,public _activateRoute: ActivatedRoute,private _location:Location) { }

  ngOnInit(): void {
    let movieId = this._activateRoute.snapshot.params['movieId'];
    this._moviesService.getMovieById(movieId).subscribe(movieDetails =>{    
      this.movieDetails = movieDetails;
      this.soundEffects = this.movieDetails.soundEffects.join();
    });
  }

  onBackButtonClick(){
    this._location.back();
  }

}
