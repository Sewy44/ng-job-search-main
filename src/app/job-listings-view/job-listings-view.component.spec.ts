import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListingsViewComponent } from './job-listings-view.component';
import { JobListingService } from '../services/job-listing.service';
import { JobListing } from '../models';
import { HttpClientModule } from '@angular/common/http';

class MockSignal<T> {
  constructor(private _value: T) {}

  value(): T {
    return this._value;
  }
}

describe('FavoriteJobListingsComponent', () => {
  let component: JobListingsViewComponent;
  let fixture: ComponentFixture<JobListingsViewComponent>;
  let mockJobListingService: jasmine.SpyObj<JobListingService>;

  beforeEach(async () => {
    mockJobListingService = jasmine.createSpyObj('JobListingService', ['getAllJobs', 'getFavoriteJobListings']);
    
    const mockJobListingsSignal = new MockSignal<JobListing[]>([]);
    mockJobListingService.getAllJobs.and.returnValue(mockJobListingsSignal as any);

    const mockFavoriteJobListingsSignal = new MockSignal<JobListing[]>([]);
    mockJobListingService.getFavoriteJobListings.and.returnValue(mockFavoriteJobListingsSignal as any);
    
    await TestBed.configureTestingModule({
      imports: [JobListingsViewComponent, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(JobListingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
