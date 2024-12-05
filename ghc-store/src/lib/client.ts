// client.ts
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Read client with CDN for fetching data
export const readClient = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2024-03-24',
  useCdn: true
});

// Write client without CDN for mutations
export const writeClient = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  token: import.meta.env.VITE_SANITY_TOKEN,
  apiVersion: '2024-03-24',
  useCdn: false,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(readClient);

export const urlFor = (source: any) => {
  return builder.image(source);
};