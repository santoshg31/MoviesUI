import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';



@NgModule({
  declarations: [MoviesComponent, MovieOverviewComponent],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
