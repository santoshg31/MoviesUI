import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MovieFilter } from 'src/app/core/interfaces/movieFilter';

import { MovieFilterComponent } from './movie-filter.component';

describe('MovieFilterComponent', () => {
  let component: MovieFilterComponent;
  let fixture: ComponentFixture<MovieFilterComponent>;
  let nativeEle:HTMLElement;
  let debugEle:DebugElement;
  let movieFilter:MovieFilter;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFilterComponent);
    component = fixture.componentInstance;
    debugEle = fixture.debugElement;
    fixture.detectChanges();
    movieFilter={
      searchTitle:'harry',
      language:'ENGLISH',
      location:'PUNE',
      sortDirection:'asc'
    };
    component.movieFilter = movieFilter;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onFilterChange function should emit movieFilterChanged event with movieFilter object',()=>{    
    component.movieFilterChanged.subscribe((movieFilterEmittedObject: MovieFilter) =>{
      expect(movieFilterEmittedObject.searchTitle).toEqual(component.movieFilter.searchTitle);
      expect(movieFilterEmittedObject.language).toEqual(component.movieFilter.language);
      expect(movieFilterEmittedObject.sortDirection).toEqual(component.movieFilter.sortDirection);
    })
    component.onFilterChange();
    fixture.detectChanges();
  });

  it('searchTitle input change should emit movieFilterChanged event with movieFilter object',()=>{      
    component.movieFilterChanged.subscribe((movieFilterEmittedObject: MovieFilter) =>{
      expect(movieFilterEmittedObject.searchTitle).toEqual('harry');
    });
    const searchTitleEle = debugEle.query(By.css('.searchTitle'));
    searchTitleEle.triggerEventHandler('input','harry');
    fixture.detectChanges();
  });
  it('language selection change should emit movieFilterChanged event with movieFilter object',()=>{      
    component.movieFilterChanged.subscribe((movieFilterEmittedObject: MovieFilter) =>{
      expect(movieFilterEmittedObject.language).toEqual('ENGLISH');
    });
    const languageEle = debugEle.query(By.css('#language'));
    languageEle.triggerEventHandler('change','ENGLISH');
    fixture.detectChanges();
  });
  it('location selection change should emit movieFilterChanged event with movieFilter object',()=>{      
    component.movieFilterChanged.subscribe((movieFilterEmittedObject: MovieFilter) =>{
      expect(movieFilterEmittedObject.location).toEqual('PUNE');
    });
    const locationEle = debugEle.query(By.css('#location'));
    locationEle.triggerEventHandler('change','PUNE');
    fixture.detectChanges();
  });
  it('Sort selection change should emit movieFilterChanged event with movieFilter object',()=>{      
    component.movieFilterChanged.subscribe((movieFilterEmittedObject: MovieFilter) =>{
      expect(movieFilterEmittedObject.sortDirection).toEqual('asc');
    });
    const searchTitleEle = debugEle.query(By.css('#sortByTitle'));
    searchTitleEle.triggerEventHandler('change','asc');
    fixture.detectChanges();
  });
});
