import { setupServer } from 'msw/node';
import { mockHandlers } from '../mocks';

export const server = setupServer(...mockHandlers);
