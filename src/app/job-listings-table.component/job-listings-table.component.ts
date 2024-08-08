import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { JobListing } from "../models";

@Component({
    selector: 'app-job-listings-table',
    standalone: true,
    templateUrl: './job-listings-table.component.html',
    styleUrl: './job-listings-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsTableComponent{

    @Input({required: true})
    jobListingsData!: JobListing[];

    @Input()
    isLoading = false;
}