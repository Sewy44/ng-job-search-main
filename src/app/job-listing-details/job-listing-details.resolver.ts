import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { JobListingDetails } from "../models";
import { JobListingService } from "../job-listing.service";
import { inject } from "@angular/core";

export function jobListingDetailsResolver(route: ActivatedRouteSnapshot): Observable<JobListingDetails> {
    const id = Number(route.paramMap.get("id"));
    return inject(JobListingService).getJobDetails(id);
}