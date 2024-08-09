import { inject, Injectable, Signal, signal } from "@angular/core";
import { JobListing, JobListingDetails, JobListingId } from "./models";
import { FavoriteJobListingsService } from "./favorite-job-listings.servce";

@Injectable({
providedIn: 'root'
})
export class JobListingService {
    private favoriteJobsService = inject(FavoriteJobListingsService);

    private getting = signal(false);
    readonly isGettingJobs = this.getting.asReadonly();
    private jobListingResults = signal<JobListing[]>([]);
    private favoriteListingResults = signal<JobListing[]>([]);
    private detailedJobListingResults = signal<JobListingDetails>({
        industries: [],
        types: [],
        description: [],
        publishDate: [],
        id: 0,
        companyName: '',
        title: '',
        companyLogo: '',
        reference: '',
        location: ''})

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

   getJobDetails(jobListingId: number): Signal<JobListingDetails>{
        fetch(`/jobs/${jobListingId}`)
        .then(response => response.json())
        .then((data: JobListingDetails) => {

            const test = data
            this.detailedJobListingResults.set(test);
            this.getting.set(false);
        })
        .catch(error => {
            console.error(`Error fetching job details for ID ${jobListingId}:`, error);
        });

        return this.detailedJobListingResults.asReadonly();


        // fetch(`/jobs/${jobListingId}`)
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error(`Failed to fetch job details for ID ${jobListingId}: ${response.statusText}`);
        //     }
        //     return response.json();
        // })
        // .then((data: JobListingDetails) => {
        //     console.log('API Response:', data); // Log the API response
        //     this.detailedJobListingResults.set(data); // Set the response to detailedJobListingResults
        // })
        // .catch(error => {
        //     console.error(`Error fetching job details for ID ${jobListingId}:`, error);
        // });

    }
}