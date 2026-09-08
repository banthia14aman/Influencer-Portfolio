/** Shared shapes. Type-only, so both server and client files can import it. */

export type Photo = {
  src: string;
  w: number;
  h: number;
  date: string;
  place: string;
  alt: string;
  swatch: string;
};

export type Creator = {
  slug: string;
  name: string;
  first: string;
  last: string;
  handle: string;
  line: string;
  base: string;
  email: string;
  /** true while the figures are illustrative rather than synced */
  sample: boolean;
  syncedAgo: string;
  stats: {
    followers: number;
    engagement: string;
    avgReach: number;
    avgSaves: number;
  };
  age: [string, number][];
  cities: [string, number][];
  glance: [string, string][];
  rates: [string, string, string][];
  brands: string[];
  heroCaption: string;
  /** already resolved to a servable path, basePath included */
  heroSrc: string;
  contactSrc: string;
  photos: Photo[];
};
