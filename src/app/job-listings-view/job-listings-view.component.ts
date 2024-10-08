import { Component, inject, Signal } from "@angular/core";
import { JobListingsTableComponent } from "../job-listings-table.component/job-listings-table.component";
import { JobListingService } from "../services/job-listing.service";
import { JobListing } from "../models";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-job-listings-view",
    standalone: true,
    imports: [CommonModule, JobListingsTableComponent],
    templateUrl: './job-listings-view.component.html'
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