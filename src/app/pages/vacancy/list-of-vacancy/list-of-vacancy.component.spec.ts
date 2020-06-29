import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfVacancyComponent } from './list-of-vacancy.component';

describe('ListOfVacancyComponent', () => {
  let component: ListOfVacancyComponent;
  let fixture: ComponentFixture<ListOfVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
