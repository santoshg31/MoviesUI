import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Movie } from 'src/app/core/interfaces/movie';
import { MovieFilter } from 'src/app/core/interfaces/movieFilter';

import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
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
    },
    {
      "movieId": 3,
      "language": "ENGLISH",
      "location": "DELHI",
      "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      "poster": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL50_.jpg",
      "soundEffects": [
        "RX6",
        "SDDS"
      ],
      "stills": [
        "https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_UY99_CR24,0,99,99_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BNzAwOTk3MDg5MV5BMl5BanBnXkFtZTcwNjQxNDY3Mw@@._V1_UY99_CR29,0,99,99_AL_.jpg",
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg"
      ],
      "title": "The Shawshank Redemption",
      "imdbID": "tt0111161",
      "listingType": "NOW_SHOWING",
      "imdbRating": "9.2"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      imports:[HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEle = fixture.debugElement;
    nativeEle = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load movies from the moviesService on init',()=>{
    component.movies = [];  
    spyOn(component._moviesService,"getMovies").and.returnValue(of(movies));
    component.ngOnInit();
    expect(component.movies.length).toEqual(3);
  });

  it('Should show error message if call the service fails',()=>{
    const errorMessage= "Error from service";
    spyOn(component._moviesService,"getMovies").and.returnValue(throwError(errorMessage));
    component.ngOnInit();
    fixture.detectChanges();
    const errorEle = debugEle.query(By.css('#error-message')).nativeElement;
    expect(errorEle.textContent).toContain(errorMessage);
  });

  describe('onMovieFilterChange',()=>{
    let movieFilter:MovieFilter;
    let filterComponentEle: { triggerEventHandler: any; };
    beforeEach(()=>{      
      spyOn(component._moviesService,"getMovies").and.returnValue(of(movies));
      filterComponentEle = debugEle.query(By.css('app-movie-filter'));
    });

    it('should call onMovieFilterChange function when movieFilterChanged event is raised',()=>{
      spyOn(component,'onMovieFilterChange');
      filterComponentEle.triggerEventHandler('movieFilterChanged',movieFilter);
      expect(component.onMovieFilterChange).toHaveBeenCalledWith(movieFilter);
    });

    it('should filter the movies by searchTitle',()=>{
      movieFilter = {
        searchTitle : 'Deathly',
        language:'',
        sortDirection:''
      }
      component.ngOnInit();
      filterComponentEle.triggerEventHandler('movieFilterChanged',movieFilter);
      expect(component.filteredMovies.length).toEqual(1);
    });
    it('should filter the movies by language',()=>{
      movieFilter = {
        searchTitle : '',
        language:'ENGLISH',
        sortDirection:''
      }      
      component.ngOnInit();
      filterComponentEle.triggerEventHandler('movieFilterChanged',movieFilter);
      expect(component.filteredMovies.length).toEqual(2);
    });
    it('should sort the movies by title',()=>{
      movieFilter = {
        searchTitle : '',
        language:'',
        sortDirection:'desc'
      }
      component.ngOnInit();
      filterComponentEle.triggerEventHandler('movieFilterChanged',movieFilter);  
      expect(component.filteredMovies[0].title).toEqual('The Shawshank Redemption');
    });

    it('should show no movies message if no movies match filter',()=>{
      movieFilter = {
        searchTitle : 'test No Movies',
        language:'',
        sortDirection:''
      }
      component.ngOnInit();
      filterComponentEle.triggerEventHandler('movieFilterChanged',movieFilter);
      fixture.detectChanges();  
      const noMoviesEle = debugEle.query(By.css('.no-movies-found')).nativeElement;
      expect(noMoviesEle).not.toBeUndefined;
      expect(noMoviesEle.textContent).toEqual(component.noMoviesMessage);
    })
  });

});
