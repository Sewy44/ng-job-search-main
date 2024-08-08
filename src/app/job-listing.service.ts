import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JobListing } from "./models";

@Injectable({
providedIn: 'root'
})
export class JobListingService {
    private http = inject(HttpClient)

    getAllJobs(): Observable<JobListing[]>{

    }
}