import type { APIRoute } from 'astro';

import IpService from '../server/ip';

export const get: APIRoute = async ({ request }) => {
  try {
    const ipAddress = IpService.extractIpFromRequest(request);
    const ipData = (await IpService.getFromCache(ipAddress)) || (await IpService.getFromAPIAndCache(ipAddress));

    const { status, city, country, countryCode, lat, lon, query, regionName } = ipData;

    const responseBody = {
      status,
      city,
      country,
      countryCode,
      ip: query,
      lat,
      lon,
      regionName,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('IP lookup failed:', err);

    return new Response(
      JSON.stringify({
        status: 'failure',
        message:
          '💩 oops. Catastrophically failed to lookup IP data.' +
          ' The usual team of killer monkeys has been dispatched.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
