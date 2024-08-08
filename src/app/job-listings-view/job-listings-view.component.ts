import { Component, inject, Signal } from "@angular/core";
import { JobsTableComponent } from "../job-listings-table.component/job-listings-table.component";
import { JobListingService } from "../job-listing.service";
import { JobListing } from "../models";

@Component({
    selector: "app-job-listings-view",
    standalone: true,
    imports: [JobsTableComponent],
    templateUrl: './job-listings-view.component.html',
    styleUrl: './job-listings-view.component.css'
})
export class JobListingsViewComponent {
    protected jobListingService = inject(JobListingService)
    protected data!: Signal<JobListing[]>

    constructor(){
        this.getAllJobs();
    }

    getAllJobs(): void{
        this.data = this.jobListingService.getAllJobs();
    }
}