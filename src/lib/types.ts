export type AdditionalType = {
  '@id': string;
  name: string;
};

export type Address = {
  '@type': 'PostalAddress';
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
};

export type GeoCoordinates = {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
};

export type Place = {
  '@type': 'Place';
  address: Address;
  geo: GeoCoordinates;
};

export type LocationRole = {
    '@type': 'Role';
    startDate?: string;
    endDate?: string;
    location: Place;
};

export type Citation = {
  '@type': 'Dataset';
  name: string;
  url: string;
};

export type Venue = {
  '@context': 'https://schema.org/';
  '@type': 'Place';
  '@id'?: string;
  additionalType: AdditionalType[];
  name: string;
  description: string;
  location: LocationRole;
  citation: Citation[];
  sameAs: string[];
};
