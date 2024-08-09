import { Routes } from '@angular/router';
import { JobListingsViewComponent } from './job-listings-view/job-listings-view.component';
import { FavoriteJobListingsComponent } from './favorite-job-listings/favorite-job-listings.component';

export const routes: Routes = [
    {path: "", component: JobListingsViewComponent},
    {path: "favorites", component: FavoriteJobListingsComponent}
];
