import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCandidateComponent } from './list-of-candidate.component';

describe('ListOfCandidateComponent', () => {
  let component: ListOfCandidateComponent;
  let fixture: ComponentFixture<ListOfCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
