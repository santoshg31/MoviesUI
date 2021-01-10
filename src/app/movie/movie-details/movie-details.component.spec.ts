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
    spyOn(component._moviesService,"getMovieById").and.returnValue(of(movieDetails));
    component.ngOnInit();
    expect(component.movieDetails).not.toBeUndefined;
    expect(component.movieDetails?.movieId).toEqual(2);
  });
  it('should display movie details',()=>{      
    spyOn(component._moviesService,"getMovieById").and.returnValue(of(movieDetails));
    component.ngOnInit();
    fixture.detectChanges();
    const titleEle = debugEle.query(By.css('.title')).nativeElement;
    expect(titleEle.textContent).toContain(component.movieDetails?.title);
  })
});
