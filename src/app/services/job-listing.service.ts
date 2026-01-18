import { inject, Injectable, Signal, signal } from "@angular/core";
import { FavoriteJobListingsService } from "./favorite-job-listings.servce";
import { Observable, catchError, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JobListing, JobListingDetails, JobListingId } from "../models";
import { ALL_JOBS, DETAILED } from "../../mocks";

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
        this.getting.set(true);

        this.http.get<JobListing[]>("/jobs").pipe(
            catchError(() => of(ALL_JOBS as JobListing[]))
        ).subscribe({
            next: (data: JobListing[]) => {
                this.jobListingResults.set(data);
                this.getting.set(false);

                const favoriteIds: JobListingId[] = this.favoriteJobsService.favoriteListings();
                this.favoriteListingResults.set(this.jobListingResults().filter((job: JobListing) => favoriteIds.includes(job.id)));
            },
            error: () => {
                this.getting.set(false);
            }
        });

        return this.jobListingResults.asReadonly()
    }

   getJobDetails(jobListingId: number): Observable<JobListingDetails>{
        return this.http.get<JobListingDetails>(`/jobs/${jobListingId}`).pipe(
            catchError((error) => {
                const fallback = (DETAILED as Record<number, JobListingDetails>)[jobListingId];
                if (fallback) {
                    return of(fallback);
                }

                return throwError(() => error);
            })
        );
    }
}
