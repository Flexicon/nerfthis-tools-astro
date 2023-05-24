export interface IpResponse {
  query: string;
  status: string;
  message: string;

  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  regionName: string;
  zip: string;

  cached?: string;
}
