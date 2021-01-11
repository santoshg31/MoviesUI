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
  movieFilter!: MovieFilter;
  movieLanguages:string[] =  ["English","Hindi"];  //hard coding for simplicity.
  locations:string[] = ["Delhi","Pune","Bangalore","Chennai"]
  constructor() { }

  ngOnInit(): void {
    const movieFilterCache = JSON.parse(localStorage.getItem('movieFilter')) as MovieFilter;
    if(movieFilterCache == null || movieFilterCache == undefined){
      this.movieFilter = {
        searchTitle:'',
        language:'',
        location:'',
        sortDirection:''
      }      
    }else{
      this.movieFilter = {...movieFilterCache};
    }
    
  }

  onFilterChange(){
    this.movieFilterChanged.emit(this.movieFilter);
    localStorage.setItem('movieFilter',JSON.stringify(this.movieFilter));
  }

}
