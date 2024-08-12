import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteJobListingsComponent } from './favorite-job-listings.component';
import { HttpClientModule } from '@angular/common/http';
import { JobListingService } from '../services/job-listing.service';
import { JobListing } from '../models';
import { Signal } from '@angular/core';

class MockSignal<T> {
  constructor(private _value: T) {}

  value(): T {
    return this._value;
  }
}

describe('FavoriteJobListingsComponent', () => {
  let component: FavoriteJobListingsComponent;
  let fixture: ComponentFixture<FavoriteJobListingsComponent>;
  let mockJobListingService: jasmine.SpyObj<JobListingService>;

  beforeEach(async () => {
    mockJobListingService = jasmine.createSpyObj('JobListingService', ['getAllJobs', 'getFavoriteJobListings']);
    
    const mockJobListingsSignal = new MockSignal<JobListing[]>([]);
    mockJobListingService.getAllJobs.and.returnValue(mockJobListingsSignal as unknown as Signal<JobListing[]>);

    const mockFavoriteJobListingsSignal = new MockSignal<JobListing[]>([]);
    mockJobListingService.getFavoriteJobListings.and.returnValue(mockFavoriteJobListingsSignal as unknown as Signal<JobListing[]>);
    
    await TestBed.configureTestingModule({
      imports: [FavoriteJobListingsComponent, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteJobListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
