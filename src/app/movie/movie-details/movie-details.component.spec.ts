import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Movie } from 'src/app/core/interfaces/movie';

import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let nativeEle:HTMLElement;
  let debugEle:DebugElement;
  let movies:Movie[] = [
    {
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
    },
    {
      "movieId": 2,
      "language": "HINDI",
      "location": "DELHI",
      "plot": "Harry, Ron, and Hermione continue their quest of finding and destroying the Dark Lord's three remaining Horcruxes, the magical items responsible for his immortality. But as the mystical Deathly Hallows are uncovered, and Voldemort finds out about their mission, the biggest battle begins and life as they know it will never be the same again.",
      "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
      "soundEffects": [
        "RX6",
        "SDDS"
      ],
      "stills": [
        "https://i.imgur.com/i3aD05u.png",
        "https://i.imgur.com/ABinULO.gif",
        "https://i.imgur.com/Wflfyct.gif"
      ],
      "listingType": "NOW_SHOWING",
      "title": "Harry Potter and the Deathly Hallows: Part 2",
      "imdbID": "tt1201607",
      "imdbRating": "8.1"
    }
  ];

  let movieDetails:Movie = {
    "movieId": 2,
    "language": "HINDI",
    "location": "DELHI",
    "plot": "Harry, Ron, and Hermione continue their quest of finding and destroying the Dark Lord's three remaining Horcruxes, the magical items responsible for his immortality. But as the mystical Deathly Hallows are uncovered, and Voldemort finds out about their mission, the biggest battle begins and life as they know it will never be the same again.",
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
    "soundEffects": [
      "RX6",
      "SDDS"
    ],
    "stills": [
      "https://i.imgur.com/i3aD05u.png",
      "https://i.imgur.com/ABinULO.gif",
      "https://i.imgur.com/Wflfyct.gif"
    ],
    "listingType": "NOW_SHOWING",
    "title": "Harry Potter and the Deathly Hallows: Part 2",
    "imdbID": "tt1201607",
    "imdbRating": "8.1"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent ],
      imports:[HttpClientModule,RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    component._activateRoute.snapshot.params['movieId'] = 2;
    fixture.detectChanges();
    debugEle = fixture.debugElement;
    nativeEle = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnit should return movieDetails',()=>{      
    spyOn(component._moviesService,"getMovies").and.returnValue(of(movies));
    component.ngOnInit();
    expect(component.movieDetails).not.toBeUndefined;
  });
  it('should display movie details',()=>{      
    spyOn(component._moviesService,"getMovies").and.returnValue(of(movies));
    component.ngOnInit();
    fixture.detectChanges();
    const titleEle = debugEle.query(By.css('.title')).nativeElement;
    expect(titleEle.textContent).toContain(component.movieDetails?.title);
  })
});
