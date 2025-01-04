import { dev } from '$app/environment';

// disable hydration when in production (no interactivity needed)
export const csr = dev;
