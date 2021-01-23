import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';

const routes:Routes =[
    {path:'', component:MoviesComponent},
    {path:'my-movies', component:MyMoviesComponent},
    {path:'my-movies/:movieId', component:MovieDetailsComponent},
    {path:':movieId', component:MovieDetailsComponent}
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MovieRoutingModule{}