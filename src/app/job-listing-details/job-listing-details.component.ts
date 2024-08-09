import { Component, Input } from "@angular/core";
import { JobListingDetails } from "../models";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'job-listing-details',
    templateUrl: 'job-listing-details.component.html',
    styleUrl: 'job-listing-details.component.css',
    standalone: true,
    imports: [CommonModule]

})
export class JobListingDetailsComponent {

    @Input()
    jobListingDetails!: JobListingDetails;

    back() {
        history.back();
    }
}