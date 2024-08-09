import { Component, inject, Input } from "@angular/core";
import { JobListing } from "../models";
import { FavoriteJobListingsService } from "../favorite-job-listings.servce";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
    selector: 'app-job-listings-table',
    standalone: true,
    imports: [RouterLink, RouterModule],
    templateUrl: './job-listings-table.component.html',
    styleUrl: './job-listings-table.component.css'
})
export class JobListingsTableComponent{

    protected favoriteJobsService = inject(FavoriteJobListingsService);

    @Input({required: true})
    jobListingsData!: JobListing[];

    @Input()
    isLoading = false;

    @Input()
    isFavoriteListingPage = false;

    highlighFavorite(id: number){
       return this.favoriteJobsService.favoriteListings().includes(id)
    }

    toggleFavorite(id: number): void{
        this.favoriteJobsService.toggleFavoriteJobListing(id);
    }


}