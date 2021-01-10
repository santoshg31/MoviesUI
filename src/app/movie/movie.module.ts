import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';
import { MovieFilterComponent } from './movie-filter/movie-filter.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';



@NgModule({
  declarations: [MoviesComponent, MovieOverviewComponent, MovieFilterComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule
  ]
})
export class MovieModule { }
