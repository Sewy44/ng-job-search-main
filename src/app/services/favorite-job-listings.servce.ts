import { effect, inject, Injectable, signal } from "@angular/core";
import { JobListingId, JobListingIds } from "../models";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class FavoriteJobListingsService {
    private readonly FAVORITE_JOBS_KEY = 'favoriteJobs';
    private storageService = inject(StorageService<JobListingIds>)
    private favoritesSignal = signal<JobListingIds>(this.storageService.get(this.FAVORITE_JOBS_KEY));
    favoriteListings = this.favoritesSignal.asReadonly();

    constructor(){
        effect(() => this.storageService.set(this.FAVORITE_JOBS_KEY, this.favoritesSignal()));
    }

    toggleFavoriteJobListing(id: JobListingId): void{
        const index = this.favoritesSignal().indexOf(id);
        if(index !== -1){
            this.favoritesSignal.update(favorites => {
                favorites.splice(index, 1);
                return [...favorites]
            });
        }
        else{
            this.favoritesSignal.update(favorites => [...favorites, id]);
        }
    }
}