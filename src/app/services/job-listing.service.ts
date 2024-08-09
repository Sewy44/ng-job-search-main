import { inject, Injectable, Signal, signal } from "@angular/core";
import { FavoriteJobListingsService } from "./favorite-job-listings.servce";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JobListing, JobListingDetails, JobListingId } from "../models";

@Injectable({
providedIn: 'root'
})
export class JobListingService {
    private favoriteJobsService = inject(FavoriteJobListingsService); 
    private http = inject(HttpClient);

    private getting = signal(false);
    readonly isGettingJobs = this.getting.asReadonly();
    private jobListingResults = signal<JobListing[]>([]);
    private favoriteListingResults = signal<JobListing[]>([]);
    
    getFavoriteJobListings(): Signal<JobListing[]>{
        return this.favoriteListingResults.asReadonly()
    }

    getAllJobs(): Signal<JobListing[]>{
        fetch('/jobs')
            .then(response => response.json())
            .then((data: JobListing[]) => {
                this.jobListingResults.set(data);
                this.getting.set(false);

                const favoriteIds: JobListingId[] = this.favoriteJobsService.favoriteListings();
                this.favoriteListingResults.set(this.jobListingResults().filter((job: JobListing) => favoriteIds.includes(job.id)));
          })
           return this.jobListingResults.asReadonly()
    }

   getJobDetails(jobListingId: number): Observable<JobListingDetails>{
        return this.http.get(`/jobs/${jobListingId}`) as Observable<JobListingDetails>;
    }
}