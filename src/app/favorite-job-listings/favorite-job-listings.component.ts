import { Component, inject, Signal } from "@angular/core";
import { JobListing } from "../models";
import { JobListingsTableComponent } from "../job-listings-table.component/job-listings-table.component";
import { JobListingService } from "../services/job-listing.service";

@Component({
    selector: 'app-favorite-job-listings-view',
    standalone: true,
    templateUrl: './favorite-job-listings.component.html',
    imports: [JobListingsTableComponent]
})
export class FavoriteJobListingsComponent {
    protected jobListingService = inject(JobListingService)
    protected data!: Signal<JobListing[]>;

    constructor(){
        this.getAllFavoriteJobs();
    }

    getAllFavoriteJobs(): void {
        this.jobListingService.getAllJobs()
        this.data = this.jobListingService.getFavoriteJobListings();
    }
}