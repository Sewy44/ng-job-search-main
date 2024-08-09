import { setupServer } from 'msw/node';
import { mockHandlers } from '../mocks';
import { JobListingDetails } from './models';

export const server = setupServer(...mockHandlers);
export const INITIAL_JOB_LISTING_DETAILS: JobListingDetails = {
    industries: [],
    types: [],
    description: [],
    publishDate: [],
    id: 0,
    companyName: '',
    title: '',
    companyLogo: '',
    reference: '',
    location: ''
}