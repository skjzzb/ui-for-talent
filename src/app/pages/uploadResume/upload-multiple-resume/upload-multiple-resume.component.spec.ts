import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultipleResumeComponent } from './upload-multiple-resume.component';

describe('UploadMultipleResumeComponent', () => {
  let component: UploadMultipleResumeComponent;
  let fixture: ComponentFixture<UploadMultipleResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMultipleResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMultipleResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
