import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieFilter } from 'src/app/core/interfaces/movieFilter';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent implements OnInit {
  @Output()
  movieFilterChanged: EventEmitter<MovieFilter> = new EventEmitter<MovieFilter>(); 
  movieFilter:MovieFilter ={
    searchTitle:'',
    language:'',
    sortDirection:''
  };
  movieLanguages:string[] =  ["ENGLISH","HINDI"];  //hard coding for simplicity. TODO get it from the api 
  constructor() { }

  ngOnInit(): void {
  }

  onFilterChange(){
    this.movieFilterChanged.emit(this.movieFilter);
  }

}
