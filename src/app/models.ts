export interface JobListing {
    id: number,
    companyName: string;
    title: string;
    companyLogo: string;
    reference: string;
    location: string;
}

export interface JobListingDetails extends JobListing {
    industries: string[],
    types: string[],
    description: string[],
    publishDate: string[]
}

export type JobListingId = JobListing["id"];
export type JobListingIds = Array<JobListingId>;