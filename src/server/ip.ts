import type { IpResponse } from "../types/ip";

import cache from "./cache";

const CACHE_TTL = 300; // 5 minutes

export async function getFromCache(ip: string): Promise<IpResponse | null> {
  const key = cacheKey(ip);

  const cached = await cache.get(key);
  if (!cached) return null;

  console.log("Cache hit for:", key);
  return { ...JSON.parse(cached), cached: true };
}

export async function getFromAPI(ip: string): Promise<IpResponse> {
  console.log("Fetching IP Geolocation for:", ip || "localhost");

  const res = await fetch(`http://ip-api.com/json/${ip}`);
  const ipData = await res.json();

  if (ipData.status !== "success") throw new Error(ipData.message);
  return ipData;
}

export async function getFromAPIAndCache(ip: string): Promise<IpResponse> {
  const ipResponse = await getFromAPI(ip);

  await saveToCache(cacheKey(ip), ipResponse);
  return ipResponse;
}

export async function getFromCacheOrAPI(ip: string): Promise<IpResponse> {
  return (await getFromCache(ip)) ?? getFromAPIAndCache(ip);
}

export function extractIpFromRequest(request: Request): string {
  // Cloudflare masks the original IP address of the client in the default request headers.
  // see: https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-connecting-ip
  const cfConnectingIp = request.headers.get("CF-Connecting-IP");
  const xRealIp = request.headers.get("X-Real-Ip");
  const xForwardedFor = request.headers.get("X-Forwarded-For") ?? "";

  return cfConnectingIp || xRealIp || xForwardedFor.split(",")[0];
}

async function saveToCache(key: string, value: IpResponse) {
  await cache.set(key, JSON.stringify(value), { EX: CACHE_TTL });
}

function cacheKey(ip: string): string {
  return `tools.geo-ip.${ip || "localhost"}`;
}

export default {
  getFromAPI,
  getFromAPIAndCache,
  getFromCache,
  getFromCacheOrAPI,
  extractIpFromRequest,
};
