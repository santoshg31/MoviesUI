import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Movie } from 'src/app/core/interfaces/movie';

import { MovieOverviewComponent } from './movie-overview.component';

describe('MovieOverviewComponent', () => {
  let hostComponent: MoviesComponent;
  let hostFixture: ComponentFixture<MoviesComponent>;
  let debugEle:DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieOverviewComponent,MoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(MoviesComponent);
    hostComponent = hostFixture.componentInstance;
    debugEle = hostFixture.debugElement;
  });

  it('should create host component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should show movie details which were passed as input from host component',()=>{
    hostComponent.movie = {
      "movieId": 1,
      "language": "ENGLISH",
      "location": "PUNE",
      "plot": "Forced to spend his summer holidays with his muggle relations, Harry Potter gets a real shock when he gets a surprise visitor: Dobby the house-elf, who warns Harry Potter against returning to Hogwarts, for terrible things are going to happen. Harry decides to ignore Dobby's warning and continues with his pre-arranged schedule. But at Hogwarts, strange and terrible things are indeed happening: Harry is suddenly hearing mysterious voices from inside the walls, muggle-born students are being attacked, and a message scrawled on the wall in blood puts everyone on his/her guard - \"The Chamber Of Secrets Has Been Opened. Enemies Of The Heir, Beware\" .",
      "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg",
      "soundEffects": [
        "DOLBY",
        "DTS"
      ],
      "stills": [
        "https://i.imgur.com/3fJ1P48.gif",
        "https://i.imgur.com/j6ECXmD.gif",
        "https://i.imgur.com/v0ooIH0.gif"
      ],
      "title": "Harry Potter and the Chamber of Secrets",
      "imdbID": "tt0295297",
      "listingType": "NOW_SHOWING",
      "imdbRating": "7.4"
    };
    hostFixture.detectChanges();
    const titleEle = debugEle.query(By.css('.title')).nativeElement;
    expect(titleEle.textContent).toContain(hostComponent.movie.title);
    const languageEle = debugEle.query(By.css('.language')).nativeElement;
    expect(languageEle.textContent).toContain(hostComponent.movie.language);
    const locationEle = debugEle.query(By.css('.location')).nativeElement;
    expect(locationEle.textContent).toContain(hostComponent.movie.location);
  })

  @Component({
    selector: `movies-list`,
    template: `<app-movie-overview [movie]="movie"></app-movie-overview>`
  })
  class MoviesComponent{
    movie!: Movie;

    @ViewChild(MovieOverviewComponent)
    public movieOverviewComponent!: MovieOverviewComponent;
  }
  
});
