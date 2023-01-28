import type { IpResponse } from '../types/ip';

import cache from './cache';

const CACHE_TTL = 300; // 5 minutes

export async function getFromCache(ip: string): Promise<IpResponse | null> {
  const key = cacheKey(ip);

  const cached = await cache.get(key);
  if (!cached) return null;

  console.log('Cache hit for:', key);
  return { ...JSON.parse(cached), cached: true };
}

export async function getFromAPI(ip: string): Promise<IpResponse> {
  console.log('Fetching IP Geolocation for:', ip || 'localhost');

  const res = await fetch(`http://ip-api.com/json/${ip}`);
  const ipData = await res.json();

  if (ipData.status !== 'success') throw new Error(ipData.message);
  return ipData;
}

export async function getFromAPIAndCache(ip: string): Promise<IpResponse> {
  const ipResponse = await getFromAPI(ip);

  await saveToCache(cacheKey(ip), ipResponse);
  return ipResponse;
}

async function saveToCache(key: string, value: IpResponse) {
  await cache.set(key, JSON.stringify(value), { EX: CACHE_TTL });
}

function cacheKey(ip: string): string {
  return `tools.geo-ip.${ip || 'localhost'}`;
}

export default {
  getFromAPI,
  getFromAPIAndCache,
  getFromCache,
};
