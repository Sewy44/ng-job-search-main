import { Injectable, Signal, signal } from "@angular/core";
import { JobListing } from "./models";

@Injectable({
providedIn: 'root'
})
export class JobListingService {
    private getting = signal(false);
    readonly isGettingJobs = this.getting.asReadonly();
    private jobListingResults = signal<JobListing[]>([]);

    getAllJobs(): Signal<JobListing[]>{
        fetch('/jobs').then(response => response.json()).then((data: JobListing[]) => {
            this.jobListingResults.set(data);
            this.getting.set(false);
          })
           return this.jobListingResults.asReadonly()
    }
}