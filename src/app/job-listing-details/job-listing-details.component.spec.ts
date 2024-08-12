import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListingDetailsComponent } from './job-listing-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { JobListingDetails } from '../models';
import { HttpClientModule } from '@angular/common/http';

describe('JobListingDetailsComponent', () => {
  let component: JobListingDetailsComponent;
  let fixture: ComponentFixture<JobListingDetailsComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockActivatedRoute = {
      data: of({
        jobListingDetails: {
          id: 1,
          companyName: 'Mock Company',
          title: 'Mock Job',
          companyLogo: 'mock-logo.png',
          reference: 'REF123',
          location: 'Mock City',
          industries: ['Industry1'],
          types: ['Full-Time'],
          description: ['Job description'],
          publishDate: new Date()
        } as JobListingDetails
      })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, DatePipe, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set jobListingDetails from the ActivatedRoute data on ngOnInit', () => {
    expect(component.jobListingDetails).toEqual({
      id: 1,
      companyName: 'Mock Company',
      title: 'Mock Job',
      companyLogo: 'mock-logo.png',
      reference: 'REF123',
      location: 'Mock City',
      industries: ['Industry1'],
      types: ['Full-Time'],
      description: ['Job description'],
      publishDate: jasmine.any(Date)
    });
  });

  it('should navigate back when back() is called', () => {
    spyOn(history, 'back');
    component.back();
    expect(history.back).toHaveBeenCalled();
  });
});
