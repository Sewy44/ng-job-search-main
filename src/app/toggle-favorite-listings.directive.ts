import { Directive, HostBinding, HostListener, inject, Input } from "@angular/core";

import { JobListingId } from "./models";
import { FavoriteJobListingsService } from "./favorite-job-listings.servce";

@Directive({
    selector: '[appToggleFavoriteListing]',
    standalone: true
})
export class toggleFavoriteListingDirective {
    private favoriteJobsService = inject(FavoriteJobListingsService);

    @Input({required: true})
    favoriteListingId!: JobListingId;

    @HostListener('click')
    toggleFavoriteListing() {
        this.favoriteJobsService.toggleFavoriteJobListing(this.favoriteListingId);
    }

    @HostBinding('class.highlight')
    get isFavoriteListing() {
        return this.favoriteJobsService.favoriteListings().includes(this.favoriteListingId);
    }
}