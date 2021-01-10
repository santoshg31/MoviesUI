import { Component, OnInit } from '@angular/core';
import { MovieFilter } from 'src/app/core/interfaces/movieFilter';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent implements OnInit {
  movieFilter:MovieFilter ={
    searchTitle:'',
    language:'',
    sortDirection:''
  };
  movieLanguages:string[] =  ["ENGLISH","HINDI"];  //hard coding for simplicity. TODO get it from the api 
  constructor() { }

  ngOnInit(): void {
  }

}
