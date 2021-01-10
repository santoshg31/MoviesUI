import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.scss']
})
export class MovieOverviewComponent implements OnInit {

  @Input()
  movie!: Movie;
  constructor() { }

  ngOnInit(): void {
  }

}
