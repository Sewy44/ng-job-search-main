import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListingsTableComponent } from './job-listings-table.component';
import { FavoriteJobListingsService } from '../services/favorite-job-listings.servce';
import { JobListing } from '../models';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('JobListingsTableComponent', () => {
  let component: JobListingsTableComponent;
  let fixture: ComponentFixture<JobListingsTableComponent>;
  let mockFavoriteJobListingsService: jasmine.SpyObj<FavoriteJobListingsService>;
  let mockActivatedRoute: any;

  const mockJobListings: JobListing[] = [
    { id: 1, companyName: 'Company A', title: 'Job A', companyLogo: 'logo-a.png', reference: 'REF001', location: 'City A' },
    { id: 2, companyName: 'Company B', title: 'Job B', companyLogo: 'logo-b.png', reference: 'REF002', location: 'City B' },
  ];

  beforeEach(async () => {
    mockFavoriteJobListingsService = jasmine.createSpyObj('FavoriteJobListingsService', ['favoriteListings', 'toggleFavoriteJobListing']);
    mockFavoriteJobListingsService.favoriteListings.and.returnValue([1]);

    mockActivatedRoute = {
        snapshot: {},
        params: of({}),
        queryParams: of({})
      };

    await TestBed.configureTestingModule({
      imports: [RouterLink, RouterModule, JobListingsTableComponent],
      providers: [
        { provide: FavoriteJobListingsService, useValue: mockFavoriteJobListingsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobListingsTableComponent);
    component = fixture.componentInstance;
    component.jobListingsData = mockJobListings;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have job listings data input set correctly', () => {
    expect(component.jobListingsData).toEqual(mockJobListings);
  });

  it('should correctly identify favorite job listings', () => {
    const isFavorite = component.highlighFavorite(1);
    expect(isFavorite).toBeTrue();

    const isNotFavorite = component.highlighFavorite(2);
    expect(isNotFavorite).toBeFalse();
  });

  it('should toggle favorite status when toggleFavorite is called', () => {
    component.toggleFavorite(1);
    expect(mockFavoriteJobListingsService.toggleFavoriteJobListing).toHaveBeenCalledWith(1);
  });

  it('should have default value for isLoading as false', () => {
    expect(component.isLoading).toBeFalse();
  });

  it('should have default value for isFavoriteListingPage as false', () => {
    expect(component.isFavoriteListingPage).toBeFalse();
  });
});
