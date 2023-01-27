import type { IpResponse } from '../types/ip';

import cache from './cache';

const CACHE_TTL = 300; // 5 minutes

export async function getFromCache(key: string): Promise<IpResponse | null> {
  const raw = await cache.get(key);
  if (!raw) return null;

  console.log('Cache hit for:', key);
  return { ...JSON.parse(raw), cached: true };
}

export async function saveToCache(key: string, value: IpResponse) {
  await cache.set(key, JSON.stringify(value), { EX: CACHE_TTL });
}

export async function getFromAPI(ip: string): Promise<IpResponse> {
  console.log('Fetching IP Geolocation for:', ip || 'localhost');
  return await fetch(`http://ip-api.com/json/${ip}`).then((res) => res.json());
}
