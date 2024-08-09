import { JobListingsViewComponent } from './job-listings-view/job-listings-view.component';
import { FavoriteJobListingsComponent } from './favorite-job-listings/favorite-job-listings.component';
import { jobListingDetailsResolver } from './job-listing-details/job-listing-details.resolver';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", component: JobListingsViewComponent},
    {path: "favorites", component: FavoriteJobListingsComponent},
    {path: "details/:id",
        loadComponent: () => import("./job-listing-details/job-listing-details.component").then(j => j.JobListingDetailsComponent), 
        resolve: {jobListingDetails: jobListingDetailsResolver}
    }
];
