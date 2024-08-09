import { Component} from "@angular/core";
import { JobListingDetails } from "../models";
import { CommonModule, DatePipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'job-listing-details',
    templateUrl: 'job-listing-details.component.html',
    styleUrl: 'job-listing-details.component.css',
    standalone: true,
    imports: [CommonModule, DatePipe]

})
export class JobListingDetailsComponent {

    jobListingDetails = {} as JobListingDetails;

    constructor(private activatedRoute: ActivatedRoute){}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response: any) => {
            this.jobListingDetails = response.jobListingDetails
        });
    }  

    back() {
        history.back();
    }
}


