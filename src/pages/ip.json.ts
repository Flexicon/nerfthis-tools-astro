import type { APIRoute } from 'astro';

import IpService from '../server/ip';

export const get: APIRoute = async ({ request }) => {
  try {
    const ipAddress = IpService.extractIpFromRequest(request);
    const ipData = (await IpService.getFromCache(ipAddress)) || (await IpService.getFromAPIAndCache(ipAddress));

    const { query, isp, org, as, ...geoIpData } = ipData;
    const responseBody = {
      ...geoIpData,
      ip: query,
    };

    return new Response(JSON.stringify(responseBody, Object.keys(responseBody).sort()), {
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
