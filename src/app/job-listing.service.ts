import { computed, inject, Injectable, Signal, signal } from "@angular/core";
import { JobListing, JobListingId } from "./models";
import { FavoriteJobListingsService } from "./favorite-job-listings.servce";

@Injectable({
providedIn: 'root'
})
export class JobListingService {
    private getting = signal(false);
    readonly isGettingJobs = this.getting.asReadonly();
    private jobListingResults = signal<JobListing[]>([]);
    private favoriteJobsService = inject(FavoriteJobListingsService);
    private favoriteListingResults = signal<JobListing[]>([]);

    getFavoriteJobListings(): Signal<JobListing[]>{
        const favoriteIds: JobListingId[] = this.favoriteJobsService.favoriteListings();
        this.favoriteListingResults.set(this.jobListingResults().filter((job: JobListing) => favoriteIds.includes(job.id)));
        return this.favoriteListingResults.asReadonly()
    }

    getAllJobs(): Signal<JobListing[]>{
        fetch('/jobs').then(response => response.json()).then((data: JobListing[]) => {
            this.jobListingResults.set(data);
            this.getting.set(false);
          })
           return this.jobListingResults.asReadonly()
    }
}